// src/pages/Booking/BookingTicket/BookingSummary.tsx

import React from 'react';
import { Movie } from '../../../utils/api.ts';
import { useTranslation } from 'react-i18next';
import { NavigateFunction } from 'react-router-dom';

interface BookingSummaryProps {
  movie: Movie | null;
  cinemaInfo: string;
  showtime: string;
  date: string;
  selectedSeats: string[];
  calculatePrice: () => number;
  handleNextClick: () => void;
  navigate: NavigateFunction;  // Add this prop type for navigate
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  movie,
  cinemaInfo,
  showtime,
  date,
  selectedSeats,
  calculatePrice,
  handleNextClick,
  navigate,  // Destructure navigate prop
}) => {
  const { t } = useTranslation();
  const movieKey = movie ? `movies.${movie.title.split('.')[1]}` : '';

  return (
    <div className="w-full max-w-5xl p-4 mb-6 border border-gray-300 bg-black text-white flex flex-col lg:flex-row items-center justify-between">
      {/* Previous Button */}
      <div className="w-full flex justify-center lg:w-auto lg:justify-start">
        <button
          className="flex-shrink-0 bg-[url('/public/images/bg-cgv-button-process.png')] w-[106px] h-[106px] bg-[149px_0px]"
          onClick={() => navigate(-1)}  // Use the navigate prop to go back
        >
          <span className="sr-only">{t('button.previous')}</span>
        </button>
      </div>

      {/* Movie and Theater Information */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full lg:w-auto mt-4 lg:mt-0">
        <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-start lg:mr-4">
          <img
            src={movie?.image}
            alt={t(`${movieKey}.title`)}
            className="w-24 h-32 object-cover mb-4 lg:mb-0 lg:mr-4"
          />
          <div className="text-center lg:text-left">
            <p className="font-bold text-md uppercase">{t(`${movieKey}.title`)}</p>
            <p className="text-md">{t(`${movieKey}.genre`)}</p>
            <p className="text-md">{t(`${movieKey}.duration`)}</p>
          </div>
        </div>

        <div className="flex flex-col text-center lg:text-left lg:mr-4">
          <p className="text-md">{t('booking.theater')}</p>
          <p className="font-bold text-md">{cinemaInfo}</p>
          <p className="text-md">{t('booking.time')}</p>
          <p className="font-bold text-md">{showtime}</p>
          <p className="font-bold text-md">{date}</p> {/* Display date */}
        </div>

        {/* Price Information */}
        <div className="flex flex-col items-center lg:items-end">
          <div className="flex items-center">
            <p className="text-md">{t('price.movie')}: </p>
            <span className="font-bold text-md ml-1">
              {selectedSeats.length > 0 ? `${calculatePrice().toLocaleString()}₫` : '0₫'}
            </span>
          </div>
          <div className="flex items-center">
            <p className="text-md">{t('price.combo')}: </p>
            <span className="font-bold text-md ml-1">0.00₫</span>
          </div>
          <div className="flex items-center">
            <p className="text-md">{t('price.total')}: </p>
            <span className="font-bold text-md ml-1">
              {selectedSeats.length > 0 ? `${calculatePrice().toLocaleString()}₫` : '0₫'}
            </span>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="w-full flex justify-center lg:w-auto lg:justify-end mt-4 lg:mt-0">
        <button
          className="flex-shrink-0 bg-[url('/public/images/bg-cgv-button-process.png')] w-[106px] h-[106px] bg-[-151px_-440px]"
          onClick={handleNextClick}
        >
          <span className="sr-only">{t('button.next')}</span>
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
