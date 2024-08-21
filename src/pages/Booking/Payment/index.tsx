// src/pages/Booking/Payment/index.tsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateSeatStatus, fetchMovieDetails } from '../../../utils/api.ts';
import { Movie } from '../../../utils/api.ts';
import { getLoggedInUserFromSessionStorage, getLoggedInUserFromCookies } from '../../../utils/UserLocalStorage.ts';
import { useTranslation } from 'react-i18next';
import PaymentSteps from './PaymentSteps.tsx';
import PaymentInfo from './PaymentInfo.tsx';

const Payment: React.FC = () => {
  const [value, setValue] = useState<number>(1);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cinemaName, setCinemaName] = useState<string>('');
  const [showtime, setShowtime] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { selectedSeats, showtimeId, movieId, cinema, time, totalPrice, date } = location.state || {};

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails(movieId).then((data) => {
        if (data) {
          setMovie(data);
        } else {
          setMovie(null);
        }
      });
    }
    if (cinema) {
      setCinemaName(cinema);
    }
    if (time) {
      setShowtime(time);
    }
  }, [movieId, cinema, time]);

  const handlePayment = async () => {
    if (selectedSeats && showtimeId) {
      try {
        await updateSeatStatus(showtimeId, selectedSeats);

        // Generate ticket data
        const ticket = {
          id: Date.now(),
          userEmail: getLoggedInUserFromSessionStorage()?.email || getLoggedInUserFromCookies()?.email,
          movieTitle: movie?.title,
          cinema: cinemaName,
          showtime: showtime,
          date,
          seats: selectedSeats,
          price: totalPrice,
          barcode: Math.random().toString(36).substr(2, 9).toUpperCase(),
          image: movie?.image,
        };

        const existingTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
        existingTickets.push(ticket);
        localStorage.setItem('tickets', JSON.stringify(existingTickets));

        alert(t('payment.success'));
        navigate('/account-info');
      } catch (error) {
        console.error('Error updating seat status:', error);
        alert(t('payment.failure'));
      }
    }
  };

  return (
    <div className='bg-[#fdfcf0]'>
      <div className='max-w-screen-lg mx-auto py-[30px]'>
        <h1 className='bg-[#231d1c] text-white font-bold text-xl text-center p-4'>
          {t('payment.title').toUpperCase()}
        </h1>

        <div className='flex flex-col lg:flex-row my-[30px] gap-5'>
          {/* Left Section: Payment Steps */}
          <PaymentSteps value={value} setValue={setValue} />

          {/* Right Section: Subtotal and Booking Summary */}
          <PaymentInfo
            movie={movie}
            cinemaName={cinemaName}
            showtime={showtime}
            date={date}
            selectedSeats={selectedSeats}
            totalPrice={totalPrice}
            handlePayment={handlePayment}
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
