// src/pages/NowShowing/index.tsx

import React, { useEffect, useState } from 'react';
import { fetchMovies, initializeLikes, toggleLike, Movie as APIMovie } from '../../utils/api.ts';
import { useTranslation } from 'react-i18next';
import BreadcrumbSection from './BreadcrumbSection.tsx';
import MovieSlider from '../../components/MovieSlider.tsx';
import ShowtimeModal from '../../components/ShowtimeModal.tsx';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation

const NowShowing: React.FC = () => {
  const [movies, setMovies] = useState<APIMovie[]>([]);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [hasLiked, setHasLiked] = useState<{ [key: number]: boolean }>({});
  const [modal, setModal] = useState<boolean | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const isLoggedIn = false; // Replace with actual authentication logic

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

  const handleOpenModal = (movieId: number) => {
    if (!isLoggedIn) {
      // Pass current location to login page using state
      navigate('/login', { state: { from: location } });
      return;
    }

    setSelectedMovie(movieId);
    setModal(true);
  };

  return (
    <div>
      <BreadcrumbSection />

      <div className="container mx-auto mt-8 px-4 lg:px-0 max-w-[980px]">
        <div className="flex items-end justify-between border-b-2 border-black pb-2 mb-5">
          <a href="/coming-soon" className="text-[20px] text-[#333] cursor-pointer">
            {t('now_showing.coming_soon')}
          </a>
          <h1 className="text-[30px] text-black uppercase tracking-wider">
            {t('now_showing.title')}
          </h1>
        </div>

        <MovieSlider
          movies={movies}
          filterCondition={(movie) => movie.dangChieu}
          hasLiked={hasLiked}
          likes={likes}
          onLike={handleLike}
          setModal={handleOpenModal}
        />
      </div>

      {modal && selectedMovie !== null && (
        <ShowtimeModal
          movieId={selectedMovie}
          modal={modal}
          setModal={setModal}
        />
      )}
    </div>
  );
};

export default NowShowing;
