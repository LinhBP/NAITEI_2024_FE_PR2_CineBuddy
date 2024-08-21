// src/pages/Booking/BookingTicket.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, fetchSeatData, updateSeatStatus } from '../../utils/api.ts';
import { Movie } from '../../utils/api.ts';
import { useTranslation } from 'react-i18next';

const BookingTicket: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Initialize seat status and conditions
  const initialSeats = () => {
    const seats: { [key: string]: string } = {};
    const conditions: { [key: string]: string } = {};
    const rows = 'ABCDEFGHJ'.split(''); 
    const numSeats = 8; 

    rows.forEach(row => {
      for (let i = 1; i <= numSeats; i++) {
        const seatId = `${row}${i}`;
        seats[seatId] = 'available';
        conditions[seatId] = row === 'J' ? 'sweetbox' : 'standard'; // J row is sweetbox, others are standard
      }
    });

    return { seats, conditions };
  };

  const { seats, conditions } = initialSeats();

  const [seatStatus, setSeatStatus] = useState<{ [key: string]: string }>(seats);
  const [seatCondition, setSeatCondition] = useState<{ [key: string]: string }>(conditions);

  const { cinemaInfo, showtime, date } = location.state || {}; // Include date from location state
  const { t } = useTranslation();
  const movieKey = movie ? `movies.${movie.title.split('.')[1]}` : ''; 

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails(parseInt(movieId)).then((data) => {
        if (data) {
          setMovie(data); 
        } else {
          setMovie(null); 
        }
      });
    }
  }, [movieId]);

  useEffect(() => {
    const showtimeId = location.pathname.split('/').pop(); 
    if (showtimeId) {
      fetchSeatData(parseInt(showtimeId)).then((data) => {
        if (data) {
          setSeatStatus(prevStatus => ({ ...prevStatus, ...data.seatStatus }));
          setSeatCondition(prevCondition => ({ ...prevCondition, ...data.seatCondition }));
        }
      }).catch((error) => {
        console.error('Error fetching seat data:', error);
      });
    }
  }, [location.pathname]);

  const handleSeatClick = (seat: string) => {
    if (seatStatus[seat] === 'occupied' || seatStatus[seat] === 'unavailable') return;

    const isSweetbox = seatCondition[seat] === 'sweetbox';
    const seatNumber = parseInt(seat.slice(1), 10); // Extract the number part from the seat ID (e.g., J1 -> 1)
    const adjacentSeat = `${seat[0]}${seatNumber % 2 === 0 ? seatNumber - 1 : seatNumber + 1}`; // Find the adjacent seat ID

    const newStatus = { ...seatStatus };

    if (isSweetbox) {
      if (seatStatus[seat] === 'checked') {
        newStatus[seat] = 'available';
        newStatus[adjacentSeat] = 'available'; // Unselect both seats if one is unselected
      } else {
        newStatus[seat] = 'checked';
        newStatus[adjacentSeat] = 'checked'; // Select both seats if one is selected
      }
    } else {
      newStatus[seat] = seatStatus[seat] === 'checked' ? 'available' : 'checked';
    }

    setSeatStatus(newStatus);
    setSelectedSeats(Object.keys(newStatus).filter(key => newStatus[key] === 'checked'));
  };

  const getSeatClass = (seat: string) => {
    if (!seatStatus || !seatCondition) return '';

    let baseClass = 'w-8 h-8 flex items-center justify-center cursor-pointer m-[2px]';
    const status = seatStatus[seat];
    const condition = seatCondition[seat];

    if (status === 'checked') baseClass += ' bg-red-500 text-white';
    else if (status === 'occupied') baseClass += ' bg-gray-500 cursor-not-allowed text-white';
    else if (status === 'unavailable') baseClass += ' bg-gray-800 cursor-not-allowed text-white';
    else if (condition === 'standard') baseClass += ' border-2 border-green-400 text-black';
    else if (condition === 'vip') baseClass += ' border-2 border-red-400 text-black';
    else if (condition === 'sweetbox') baseClass += ' bg-pink-400 text-white';

    return baseClass;
  };

  const calculatePrice = () => {
    let price = 0;
    selectedSeats.forEach(seat => {
      const condition = seatCondition[seat];
      if (condition === 'sweetbox') price += 140000;
      else if (condition === 'vip') price += 130000;
      else price += 120000;
    });
    return price;
  };

  const handleNextClick = async () => {
    if (selectedSeats.length === 0) {
      alert('You have to choose your seat first.');
      return;
    }

    const showtimeId = location.pathname.split('/').pop();
    if (showtimeId) {
      try {
        // Save seat status in local storage
        const savedSeats = JSON.parse(localStorage.getItem('seatStatus') || '{}');
        savedSeats[showtimeId] = { ...seatStatus };
        localStorage.setItem('seatStatus', JSON.stringify(savedSeats));

        await updateSeatStatus(parseInt(showtimeId), selectedSeats);
        const totalPrice = calculatePrice();
        navigate('/payment', {
          state: {
            selectedSeats,
            showtimeId: parseInt(showtimeId),
            movieId: movie?.id,
            cinema: cinemaInfo,
            time: showtime,
            date, // Pass date to the Payment page
            seatStatus,
            totalPrice,
          },
        });
      } catch (error) {
        console.error('Error updating seat status:', error);
      }
    }
  };

  useEffect(() => {
    const showtimeId = location.pathname.split('/').pop();
    if (showtimeId) {
      const savedSeats = JSON.parse(localStorage.getItem('seatStatus') || '{}');
      if (savedSeats[showtimeId]) {
        setSeatStatus(savedSeats[showtimeId]);
      }
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center p-4 bg-white">
      {/* Showtime and Cinema Information */}
      <div className="flex justify-center w-full max-w-5xl p-4 border border-black bg-black">
        <h2 className="text-xl text-white font-bold mb-2">{t(`showing.title`)}</h2>
      </div>
      <div className="w-full max-w-5xl p-4 mb-6 border border-black bg-[#fdfcf0]">
        <h2 className="text-xl font-bold mb-2">{t(`${movieKey}.title`)}</h2>
        <p>{cinemaInfo}</p>
        <p>{showtime}</p>
        <p>{date}</p> {/* Display date */}
      </div>

      {/* Seat Selection Screen */}
      <div className="w-full max-w-[300px] mb-6">
        {Object.keys(seatStatus).length > 0 ? (
          <div style={{ maxWidth: `${8 * 40}px` }} className="grid grid-cols-8 gap-[2px] p-2">
            {Object.entries(seatStatus).map(([seat]) => (
              <div
                key={seat}
                className={getSeatClass(seat)}
                onClick={() => handleSeatClick(seat)}
              >
                {seat}
              </div>
            ))}
          </div>
        ) : (
          <p>{t('seats.loading')}</p>
        )}
      </div>

      {/* Seat type legends */}
      <div className="w-full max-w-2xl mb-6">
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="flex items-center">
            <div className="w-4 h-4 border border-green-400 mr-1"></div> {t('seats.standard')}
          </div>
          <div className="flex items-center ml-4">
            <div className="w-4 h-4 border border-red-400 mr-1"></div> {t('seats.vip')}
          </div>
          <div className="flex items-center ml-4">
            <div className="w-4 h-4 bg-pink-400 mr-1"></div> {t('seats.sweetbox')}
          </div>
          <div className="flex items-center ml-4">
            <div className="w-4 h-4 bg-red-500 mr-1"></div> {t('seats.checked')}
          </div>
          <div className="flex items-center ml-4">
            <div className="w-4 h-4 bg-gray-500 mr-1"></div> {t('seats.occupied')}
          </div>
          <div className="flex items-center ml-4">
            <div className="w-4 h-4 bg-gray-800 mr-1"></div> {t('seats.unavailable')}
          </div>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="w-full max-w-5xl p-4 mb-6 border border-gray-300 bg-black text-white flex flex-col lg:flex-row items-center justify-between">
        {/* Previous Button */}
        <div className="w-full flex justify-center lg:w-auto lg:justify-start">
          <button
            className="flex-shrink-0 bg-[url('/public/images/bg-cgv-button-process.png')] w-[106px] h-[106px] bg-[149px_0px]"
            onClick={() => navigate(-1)} // Navigate to the previous page
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
    </div>
  );
};

export default BookingTicket;
