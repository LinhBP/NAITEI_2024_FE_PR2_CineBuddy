// src/pages/MovieDetail/index.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BreadcrumbSection from './BreadcrumbSection.tsx';
import MovieInfo from './MovieInfo.tsx';
import TabSection from './TabSection.tsx';
import ShowtimeModal from '../../components/ShowtimeModal.tsx';
import { fetchMovieDetails, toggleLike, initializeLikes, Movie } from '../../utils/api.ts';
import { useTranslation } from 'react-i18next';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [modal, setModal] = useState<boolean | null>(null);
  const [content, setContent] = useState<number>(0);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [hasLiked, setHasLiked] = useState<{ [key: number]: boolean }>({});
  const { t } = useTranslation();
  const isLoggedIn = true;

  useEffect(() => {
    if (id) {
      fetchMovieDetails(Number(id))
        .then((movieData) => {
          if (movieData) {
            setMovie(movieData);
            const { likes, hasLiked } = initializeLikes([movieData], isLoggedIn);
            setLikes(likes);
            setHasLiked(hasLiked);
          } else {
            setMovie(null);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch movie details:', error);
          setMovie(null);
        });
    }

    window.scrollTo(0, 0);
  }, [id, isLoggedIn]);

  const handleLike = () => {
    if (movie) {
      const { newHasLiked, newLikesCount } = toggleLike(movie.id, hasLiked[movie.id], likes, isLoggedIn);
      setHasLiked((prev) => ({ ...prev, [movie.id]: newHasLiked }));
      setLikes((prev) => ({ ...prev, [movie.id]: newLikesCount }));
    }
  };

  if (!movie) {
    return <div>{t('home.loading')}</div>;
  }

  return (
    <div>
      {/* Breadcrumb */}
      <BreadcrumbSection movieTitle={movie.title} />

      <div className="container mx-auto py-10 px-4 lg:px-0 max-w-[980px]">
        <MovieInfo
          movie={movie}
          likes={likes}
          hasLiked={hasLiked}
          handleLike={handleLike}
          setModal={setModal}
        />
        
        <TabSection
          movie={movie}
          content={content}
          setContent={setContent}
        />

        {modal && (
          <ShowtimeModal
            movieId={movie.id}
            modal={modal}
            setModal={setModal}
          />
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
