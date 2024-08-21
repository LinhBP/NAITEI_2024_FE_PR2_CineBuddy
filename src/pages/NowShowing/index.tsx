// src/pages/NowShowing/index.tsx

import React, { useEffect, useState } from 'react';
import { fetchMovies, initializeLikes, toggleLike, Movie as APIMovie } from '../../utils/api.ts';
import { useTranslation } from 'react-i18next';
import BreadcrumbSection from './BreadcrumbSection.tsx';
import MovieSlider from '../../components/MovieSlider.tsx'; // Import with .tsx extension
import ShowtimeModal from '../../components/ShowtimeModal.tsx'; // Import with .tsx extension
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getLoggedInUserFromSessionStorage, getLoggedInUserFromCookies } from '../../utils/UserLocalStorage.ts'; // Import utility function to check login status

const NowShowing: React.FC = () => {
  const [movies, setMovies] = useState<APIMovie[]>([]);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [hasLiked, setHasLiked] = useState<{ [key: number]: boolean }>({});
  const [modal, setModal] = useState<boolean | null>(null); // State for modal
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null); // State for selected movie
  const { t } = useTranslation();
  const navigate = useNavigate(); // Initialize useNavigate

  // Check if the user is logged in by checking sessionStorage and cookies
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!(getLoggedInUserFromSessionStorage() || getLoggedInUserFromCookies()));

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
      navigate('/login', { state: { from: window.location.pathname } }); // Redirect to login page if not logged in and store the current page
      return;
    }

    setSelectedMovie(movieId); // Set selected movie
    setModal(true); // Open modal
  };

  // Effect to update isLoggedIn state based on sessionStorage and cookie changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!(getLoggedInUserFromSessionStorage() || getLoggedInUserFromCookies()));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div>
      {/* Breadcrumb */}
      <BreadcrumbSection />

      {/* Now Showing Section */}
      <div className="container mx-auto mt-8 px-4 lg:px-0 max-w-[980px]">
        {/* Header */}
        <div className="flex items-end justify-between border-b-2 border-black pb-2 mb-5">
          <a href="/coming-soon" className="text-[20px] text-[#333] cursor-pointer">
            {t('now_showing.coming_soon')}
          </a>
          <h1 className="text-[30px] text-black uppercase tracking-wider">
            {t('now_showing.title')}
          </h1>
        </div>

        {/* Movie Slider */}
        <MovieSlider
          movies={movies}
          filterCondition={(movie) => movie.dangChieu} // Filter for now showing movies
          hasLiked={hasLiked}
          likes={likes}
          onLike={handleLike}
          setModal={handleOpenModal} // Pass handleOpenModal function
        />
      </div>

      {/* Show Modal if triggered */}
      {modal && selectedMovie !== null && (
        <ShowtimeModal
          movieId={selectedMovie} // Pass the selected movie ID
          modal={modal}
          setModal={setModal}
        />
      )}
    </div>
  );
};

export default NowShowing;
