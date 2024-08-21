// src/pages/MovieDetail/MovieInfo.tsx

import React from 'react';
import { Movie } from '../../utils/api.ts';
import TicketButton from '../../components/TicketButton.tsx';
import { useTranslation } from 'react-i18next';

interface MovieInfoProps {
  movie: Movie;
  likes: { [key: number]: number };
  hasLiked: { [key: number]: boolean };
  handleLike: () => void;
  setModal: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const MovieInfo: React.FC<MovieInfoProps> = ({
  movie,
  likes,
  hasLiked,
  handleLike,
  setModal,
}) => {
  const { t } = useTranslation();
  const movieKey = `movies.${movie.title.split('.')[1]}`;

  return (
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
            <img src="/images/like_icon.png" alt="Like" className="mr-1" />
            {hasLiked[movie.id] ? t('button.unlike') : t('button.like')} {likes[movie.id]}
          </button>
          <TicketButton movieId={movie.id} setModal={setModal} />
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
