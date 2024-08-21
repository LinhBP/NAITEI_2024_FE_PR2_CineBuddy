// src/pages/MovieDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb.tsx';
import TicketButton from '../components/TicketButton.tsx';
import ShowtimeModal from '../components/ShowtimeModal.tsx';
import { fetchMovieDetails, toggleLike, initializeLikes, Movie } from '../utils/api.ts';
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
            setLikes(likes); // Initialize like count from movie data
            setHasLiked(hasLiked); // Initialize like status
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

  const movieKey = `movies.${movie.title.split('.')[1]}`;

  const breadcrumbItems = [
    {
      title: (
        <Link to="/">
          <img
            src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bg-cgv-bread-home.png"
            alt="Home"
          />
        </Link>
      ),
    },
    {
      title: <span className="text-black">{t('breadcrumbs.movies')}</span>,
    },
    {
      title: <span className="underline font-bold">{t(`${movieKey}.title`)}</span>,
    },
  ];

  const detailTrailerTabs = [
    {
      text: t('details'),
      id: 0,
    },
    {
      text: t('trailer'),
      id: 1,
    },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-[#f1f0e5] border-b-[#cacac0] border-2">
        <div className="container center py-2 pl-40">
          <Breadcrumb items={breadcrumbItems} separator=">" />
        </div>
      </div>

      <div className="container mx-auto py-10 px-4 lg:px-0 max-w-[980px]">
        <h1 className="text-2xl font-bold mb-4">{t('breadcrumbs.movies')}</h1>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <img
              src={movie.image}
              alt={t(`${movieKey}.title`)}
              className="w-3/4 h-auto border-2 border-black"
            />
          </div>
          <div className="w-full md:w-3/4 md:pl-8">
            <h2 className="text-2xl font-bold mb-4">{t(`${movieKey}.title`)}</h2>
            <p>
              <strong>{t('release_date')}:</strong> {movie.release_date}
            </p>
            <p>
              <strong>{t('genre')}:</strong> {t(`${movieKey}.genre`)}
            </p>
            <p>
              <strong>{t('duration')}:</strong> {t(`${movieKey}.duration`)}
            </p>
            <p>
              <strong>{t('description')}:</strong> {t(`${movieKey}.description`)}
            </p>
            <p>
              <strong>{t('language')}:</strong> {t(`${movieKey}.language`)}
            </p>
            <p>
              <strong>{t('rated')}:</strong> {t(`${movieKey}.rated`)}
            </p>
            <div className="my-5 flex items-center">
              <button
                className={`flex items-center justify-center text-white text-sm font-bold px-1 py-0.5 rounded w-[100px] ${
                  hasLiked[movie.id] ? 'bg-blue-800' : 'bg-[#1877f2]'
                }`}
                onClick={handleLike}
              >
                <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/FEppCFCt76d.png" alt="Like" className="mr-1" />
                {hasLiked[movie.id] ? 'Unlike' : 'Like'} {likes[movie.id]}
              </button>
              <TicketButton movieId={movie.id} setModal={setModal} />
              {modal && (
                <ShowtimeModal
                  movieId={movie.id}
                  modal={modal}
                  setModal={setModal}
                />
              )}
            </div>
          </div>
        </div>

        <div className="red-ribbon mb-10">
          <ul className="text-center mb-8">
            {detailTrailerTabs.map((tab) => (
              <li
                key={tab.id}
                className={`inline-block bg-[#e71a0f] h-[40px] leading-[40px] text-white cursor-pointer bg-no-repeat ${
                  tab.id === 0
                    ? "bg-[url('/public/images/ribon_left_menu.gif')] bg-left px-[10px] pl-[25px]"
                    : "bg-[url('/public/images/ribon_right.gif')] bg-right px-[10px] pr-[25px]"
                }`}
                onClick={() => setContent(tab.id)}
              >
                {content === tab.id && (
                  <img
                    src="/images/ico_finger.png"
                    alt={t('home.finger_icon_alt')}
                    className="inline-block mr-[15px]"
                  />
                )}
                {tab.text}
              </li>
            ))}
          </ul>

          {content === 0 ? (
            <p>{t(`${movieKey}.description`)}</p>
          ) : (
            <div className="flex justify-center">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${movie.trailer}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
