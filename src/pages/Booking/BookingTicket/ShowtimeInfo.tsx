// src/pages/Booking/BookingTicket/ShowtimeInfo.tsx

import React from 'react';
import { Movie } from '../../../utils/api.ts';
import { useTranslation } from 'react-i18next';

interface ShowtimeInfoProps {
  movie: Movie | null;
  cinemaInfo: string;
  showtime: string;
  date: string;
}

const ShowtimeInfo: React.FC<ShowtimeInfoProps> = ({ movie, cinemaInfo, showtime, date }) => {
  const { t } = useTranslation();
  const movieKey = movie ? `movies.${movie.title.split('.')[1]}` : '';

  return (
    <>
      <div className="flex justify-center w-full max-w-5xl p-4 border border-black bg-black">
        <h2 className="text-xl text-white font-bold mb-2">{t(`showing.title`).toUpperCase()}</h2>
      </div>
      <div className="w-full max-w-5xl p-4 mb-6 border border-black bg-[#fdfcf0]">
        <h2 className="text-xl font-bold mb-2">{t(`${movieKey}.title`)}</h2>
        <p>{cinemaInfo}</p>
        <p>{showtime}</p>
        <p>{date}</p> {/* Display date */}
      </div>
    </>
  );
};

export default ShowtimeInfo;
