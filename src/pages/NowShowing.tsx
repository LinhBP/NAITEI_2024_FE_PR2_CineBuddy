// src/pages/NowShowing.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb.tsx';
import { fetchMovies, initializeLikes, toggleLike, Movie as APIMovie } from '../utils/api.ts';
import { useTranslation } from 'react-i18next';
import TicketButton from '../components/TicketButton.tsx';
import ShowtimeModal from '../components/ShowtimeModal.tsx';

const NowShowing: React.FC = () => {
  const [movies, setMovies] = useState<APIMovie[]>([]);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [hasLiked, setHasLiked] = useState<{ [key: number]: boolean }>({});
  const [modal, setModal] = useState<boolean | null>(null); // State for modal
  const { t } = useTranslation();
  const navigate = useNavigate();

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

  const breadcrumbItems = [
    {
      title: <Link to="/"><img src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bg-cgv-bread-home.png" alt="Home" /></Link>
    },
    {
      title: <span className="text-black">{t('breadcrumbs.movies')}</span>
    },
    {
      title: <span className="underline font-bold">{t('breadcrumbs.now_showing')}</span>
    }
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-[#f1f0e5] border-b-[#cacac0] border-2">
        <div className="container center py-2 pl-40">
          <Breadcrumb items={breadcrumbItems} separator=">" />
        </div>
      </div>

      {/* Now Showing Section */}
      <div className="container mx-auto mt-8 px-4 lg:px-0 max-w-[980px]">
        {/* Header */}
        <div className="flex items-end justify-between border-b-2 border-black pb-2 mb-5">
          <Link to="/coming-soon" className="text-[20px] text-[#333] cursor-pointer">{t('now_showing.coming_soon')}</Link>
          <h1 className="text-[30px] text-black uppercase tracking-wider">{t('now_showing.title')}</h1>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          {movies.filter(movie => movie.dangChieu).map(movie => {
            const movieKey = movie.title.split('.')[1];
            return (
              <div
                key={movie.id}
                className="flex flex-col items-center justify-between h-[490px]"
              >
                {/* Movie Image with Thicker Border */}
                <div className="flex justify-center items-center mb-4">
                  <img
                    src={movie.image}
                    alt={t(`movies.${movieKey}.title`)}
                    className="border-4 border-black object-cover w-[200px] h-[300px]"
                  />
                </div>

                {/* Movie Details */}
                <div className="text-left text-black mb-4 flex-grow h-[120px]">
                  <h2 
                    className="font-bold text-xl mb-2 cursor-pointer" 
                    onClick={() => navigate(`/movie-detail/${movie.id}`)}
                  >
                    {t(`movies.${movieKey}.title`)}
                  </h2>
                  <p><strong>{t('genre')}:</strong> {t(`movies.${movieKey}.genre`)}</p>
                  <p><strong>{t('duration')}:</strong> {t(`movies.${movieKey}.duration`)}</p>
                  <p><strong>{t('release_date')}:</strong> {movie.release_date}</p>
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center w-full">
                  <button
                    className={`flex items-center justify-center text-white text-sm font-bold px-1 py-0.5 rounded w-[100px] ${
                      hasLiked[movie.id] ? 'bg-[#145dbf]' : 'bg-[#1877f2]'
                    } hover:bg-[#145dbf]`}
                    onClick={() => handleLike(movie.id)}
                  >
                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/FEppCFCt76d.png" alt="Like" className="mr-1" />
                    {hasLiked[movie.id] ? 'Unlike' : 'Like'} {likes[movie.id]}
                  </button>
                  <TicketButton movieId={movie.id} setModal={setModal} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Show Modal if triggered */}
      {modal && (
        <ShowtimeModal
          movieId={1} // Replace with actual selected movie ID
          modal={modal}
          setModal={setModal}
        />
      )}
    </div>
  );
};

export default NowShowing;
