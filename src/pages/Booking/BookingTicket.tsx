// src/pages/Booking/BookingTicket.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchMovieDetails, Movie } from '../../utils/api.ts';
import { useTranslation } from 'react-i18next';

const BookingTicket: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const location = useLocation();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seatStatus, setSeatStatus] = useState<{ [key: string]: string }>({
    // Seat status (checked, occupied, unavailable)
    A1: 'available', A2: 'available', A3: 'available', A4: 'available', A5: 'available', A6: 'available', A7: 'available', A8: 'available',
    B1: 'available', B2: 'available', B3: 'available', B4: 'available', B5: 'available', B6: 'available', B7: 'available', B8: 'available',
    C1: 'available', C2: 'available', C3: 'available', C4: 'available', C5: 'available', C6: 'available', C7: 'available', C8: 'available',
    D1: 'available', D2: 'available', D3: 'available', D4: 'available', D5: 'available', D6: 'available', D7: 'available', D8: 'available',
    E1: 'available', E2: 'available', E3: 'occupied', E4: 'occupied', E5: 'available', E6: 'available', E7: 'available', E8: 'available',
    F1: 'available', F2: 'available', F3: 'unavailable', F4: 'unavailable', F5: 'available', F6: 'available', F7: 'available', F8: 'available',
    G1: 'available', G2: 'available', G3: 'available', G4: 'available', G5: 'available', G6: 'available', G7: 'available', G8: 'available',
    H1: 'available', H2: 'available', H3: 'available', H4: 'available', H5: 'available', H6: 'available', H7: 'available', H8: 'available',
    J1: 'available', J2: 'available', J3: 'available', J4: 'available', J5: 'available', J6: 'available', J7: 'available', J8: 'available',
  });

  const seatCondition: { [key: string]: string } = {
    // Seat condition (standard, vip, sweetbox)
    A1: 'standard', A2: 'standard', A3: 'standard', A4: 'standard', A5: 'standard', A6: 'standard', A7: 'standard', A8: 'standard',
    B1: 'standard', B2: 'standard', B3: 'standard', B4: 'standard', B5: 'standard', B6: 'standard', B7: 'standard', B8: 'standard',
    C1: 'standard', C2: 'standard', C3: 'standard', C4: 'standard', C5: 'standard', C6: 'standard', C7: 'standard', C8: 'standard',
    D1: 'vip', D2: 'vip', D3: 'vip', D4: 'vip', D5: 'vip', D6: 'vip', D7: 'vip', D8: 'vip',
    E1: 'vip', E2: 'vip', E3: 'vip', E4: 'vip', E5: 'vip', E6: 'vip', E7: 'vip', E8: 'vip',
    F1: 'vip', F2: 'vip', F3: 'vip', F4: 'vip', F5: 'vip', F6: 'vip', F7: 'vip', F8: 'vip',
    G1: 'vip', G2: 'vip', G3: 'vip', G4: 'vip', G5: 'vip', G6: 'vip', G7: 'vip', G8: 'vip',
    H1: 'vip', H2: 'vip', H3: 'vip', H4: 'vip', H5: 'vip', H6: 'vip', H7: 'vip', H8: 'vip',
    J1: 'sweetbox', J2: 'sweetbox', J3: 'sweetbox', J4: 'sweetbox', J5: 'sweetbox', J6: 'sweetbox', J7: 'sweetbox', J8: 'sweetbox'
  };

  const { t } = useTranslation();
  const movieKey = movie ? `movies.${movie.title.split('.')[1]}` : ''; 

  // Extract cinemaInfo and showtime from location state
  const { cinemaInfo, showtime } = location.state || {};

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

  const handleSeatClick = (seat: string) => {
    if (seatStatus[seat] === 'occupied' || seatStatus[seat] === 'unavailable') return;

    if (seatCondition[seat] === 'sweetbox') {
      const pairSeat = seat[0] + (parseInt(seat[1]) % 2 === 0 ? parseInt(seat[1]) - 1 : parseInt(seat[1]) + 1);
      if (seatStatus[seat] === 'checked') {
        setSeatStatus((prevStatus) => ({
          ...prevStatus,
          [seat]: 'available',
          [pairSeat]: 'available'
        }));
        setSelectedSeats((prevSeats) => prevSeats.filter((s) => s !== seat && s !== pairSeat));
      } else {
        setSeatStatus((prevStatus) => ({
          ...prevStatus,
          [seat]: 'checked',
          [pairSeat]: 'checked'
        }));
        setSelectedSeats((prevSeats) => [...prevSeats, seat, pairSeat]);
      }
    } else {
      setSeatStatus((prevStatus) => ({
        ...prevStatus,
        [seat]: prevStatus[seat] === 'checked' ? 'available' : 'checked'
      }));

      if (selectedSeats.includes(seat)) {
        setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      } else {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const getSeatClass = (seat: string) => {
    const status = seatStatus[seat];
    const condition = seatCondition[seat];

    let baseClass = 'w-8 h-8 flex items-center justify-center cursor-pointer m-[2px]'; 

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
    selectedSeats.forEach((seat) => {
      if (seatStatus[seat] === 'checked') {
        if (seatCondition[seat] === 'sweetbox') price += 140000;
        else if (seatCondition[seat] === 'vip') price += 130000;
        else price += 120000;
      }
    });
    return price;
  };

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
      </div>

      <div className="w-full max-w-2xl mb-6">
        <div className="flex justify-center mb-4">
          <div className="w-full h-12 bg-[url('/public/images/bg-screen.png')] bg-no-repeat bg-contain"></div>
        </div>
      </div>

      {/* Seat Selection Screen */}
      <div className="w-full max-w-[300px] mb-6">
        <div className="max-w-[300px] grid grid-cols-8 gap-[2px] p-2">
          {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'].map((row) =>
            Array.from({ length: 8 }, (_, i) => `${row}${8 - i}`).map((seat) => (
              <div
                key={seat}
                className={getSeatClass(seat)}
                onClick={() => handleSeatClick(seat)}
              >
                {seat}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="w-full max-w-2xl mb-6">
        <div className="mt-4">
          {/* Seat type legends */}
          <div className="flex flex-wrap items-center gap-2">
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
      </div>

      {/* Booking Summary */}
      <div className="w-full max-w-5xl p-4 mb-6 border border-gray-300 bg-black text-white">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <img
              src={movie?.image}
              alt={t(`${movieKey}.title`)}
              className="w-24 h-32 object-cover mr-4"
            />
            <div>
              <p className="font-bold text-lg">{t(`${movieKey}.title`)}</p>
              <p>{t(`${movieKey}.genre`)}</p>
              <p>{t(`${movieKey}.duration`)}</p>
            </div>
          </div>
          <div className="text-right">
            <p>{t('booking.theater')}: {cinemaInfo}</p>
            <p>{showtime}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button className="bg-gray-700 text-white py-2 px-4 rounded-md">{t('button.previous')}</button>
          <div className="flex flex-col items-end">
            <p>{t('price.movie')}: {selectedSeats.length > 0 ? `${calculatePrice().toLocaleString()}₫` : '0₫'}</p>
            <p>{t('price.combo')}: 0.00₫</p>
            <p>{t('price.total')}: {selectedSeats.length > 0 ? `${calculatePrice().toLocaleString()}₫` : '0₫'}</p>
          </div>
          <button className="bg-red-700 text-white py-2 px-4 rounded-md">{t('button.next')}</button>
        </div>
      </div>
    </div>
  );
};

export default BookingTicket;
