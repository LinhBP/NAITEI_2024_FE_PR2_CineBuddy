// src/pages/Booking/Payment/PaymentInfo.tsx

import React from 'react';
import { Movie } from '../../../utils/api.ts';
import { useTranslation } from 'react-i18next';

interface PaymentInfoProps {
  movie: Movie | null;
  cinemaName: string;
  showtime: string;
  date: string;
  selectedSeats: string[];
  totalPrice: number;
  handlePayment: () => void;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({
  movie,
  cinemaName,
  showtime,
  date,
  selectedSeats,
  totalPrice,
  handlePayment,
}) => {
  const { t } = useTranslation();
  const movieTitleKey = movie ? `movies.${movie.title.split('.')[1]}.title` : '';

  return (
    <div className='w-full lg:w-4/12 mt-5 lg:mt-0'>
      <div className='bg-white p-4 shadow-lg'>
        <h2 className='font-bold text-lg mb-2'>{t('payment.summary')}</h2>
        <p>{t('payment.movie')}: {t(movieTitleKey)}</p>
        <p>{t('payment.showtime')}: {showtime}</p>
        <p>{t('payment.date')}: {date}</p>
        <p>{t('payment.cinema')}: {cinemaName}</p>
        <p>{t('payment.seats')}: {selectedSeats.join(', ')}</p>
        <div className='flex justify-between font-bold mt-2'>
          <span>{t('payment.total')}:</span>
          <span>{totalPrice?.toLocaleString()}₫</span>
        </div>
        <button 
          className='bg-[#231d1c] text-white py-2 px-4 mt-4 w-full'
          onClick={handlePayment}
        >
          {t('payment.pay_button')}
        </button>
      </div>
    </div>
  );
};

export default PaymentInfo;
