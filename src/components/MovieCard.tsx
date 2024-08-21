// src/components/MovieCard.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import TicketButton from './TicketButton.tsx'; // Ensure this path is correct
import { Movie } from '../utils/api.ts'; // Ensure this path is correct

interface MovieCardProps {
  movie: Movie;
  hasLiked: boolean;
  likes: number;
  onLike: (id: number) => void;
  setModal: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  hasLiked,
  likes,
  onLike,
  setModal,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Initialize useNavigate

  const movieKey = movie.title.split('.')[1];

  return (
    <div className="flex flex-col items-center justify-between h-[490px]">
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
          onClick={() => navigate(`/movie-detail/${movie.id}`)} // Add navigation onClick
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
            hasLiked ? 'bg-[#145dbf]' : 'bg-[#1877f2]'
          } hover:bg-[#145dbf]`}
          onClick={() => onLike(movie.id)}
        >
          <img src="/images/like_icon.png" alt="Like" className="mr-1" />
          {hasLiked ? t('button.unlike') : t('button.like')} {likes}
        </button>
        <TicketButton movieId={movie.id} setModal={setModal} />
      </div>
    </div>
  );
};

export default MovieCard;
