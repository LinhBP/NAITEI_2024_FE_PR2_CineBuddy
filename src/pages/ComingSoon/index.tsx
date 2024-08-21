//src/pages/ComingSoon/index.ts

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BreadcrumbSection from './BreadcrumbSection.tsx';
import MovieSlider from '../../components/MovieSlider.tsx'; // Import the new MovieSlider component
import ShowtimeModal from '../../components/ShowtimeModal.tsx';
import { fetchMovies, toggleLike, initializeLikes, Movie } from '../../utils/api.ts';
import { useTranslation } from 'react-i18next';

const ComingSoon: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [hasLiked, setHasLiked] = useState<{ [key: number]: boolean }>({});
  const [modal, setModal] = useState<boolean | null>(null);
  const { t } = useTranslation();
  const isLoggedIn = true; // Replace with actual authentication logic

  useEffect(() => {
    const fetchData = async () => {
      const moviesData = await fetchMovies();
      setMovies(moviesData);
      const { likes, hasLiked } = initializeLikes(moviesData, isLoggedIn);
      setLikes(likes);
      setHasLiked(hasLiked);
    };

    fetchData();
  }, [isLoggedIn]);

  const handleLike = (id: number) => {
    const { newHasLiked, newLikesCount } = toggleLike(id, hasLiked[id], likes, isLoggedIn);
    setHasLiked((prev) => ({ ...prev, [id]: newHasLiked }));
    setLikes((prev) => ({ ...prev, [id]: newLikesCount }));
  };

  return (
    <div>
      {/* Breadcrumb */}
      <BreadcrumbSection />

      {/* Coming Soon Section */}
      <div className="container mx-auto mt-8 px-4 lg:px-0 max-w-[980px]">
        {/* Header */}
        <div className="flex items-end justify-between border-b-2 border-black pb-2 mb-5">
          <h1 className="text-[38px] text-[#333]">{t('now_showing.coming_soon')}</h1>
          <Link to="/now-showing" className="text-[20px] text-[#666] uppercase tracking-wider cursor-pointer">
            {t('now_showing.title')}
          </Link>
        </div>

        {/* Movie Slider */}
        <MovieSlider
          movies={movies}
          filterCondition={(movie) => movie.sapChieu} // Filter for coming soon movies
          hasLiked={hasLiked}
          likes={likes}
          onLike={handleLike}
          setModal={setModal}
        />
      </div>

      {/* Showtime Modal */}
      {modal && (
        <ShowtimeModal
          movieId={0} // Replace with the actual selected movie ID
          modal={modal}
          setModal={setModal}
        />
      )}
    </div>
  );
};

export default ComingSoon;
