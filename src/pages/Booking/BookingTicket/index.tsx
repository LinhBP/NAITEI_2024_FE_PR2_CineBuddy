import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, fetchSeatData, updateSeatStatus } from '../../../utils/api.ts';
import { Movie } from '../../../utils/api.ts';
import ShowtimeInfo from './ShowtimeInfo.tsx';
import SeatSelection from './SeatSelection.tsx';
import BookingSummary from './BookingSummary.tsx';
import { useTranslation } from 'react-i18next';  // Import useTranslation
import { SEAT_PRICES } from '../../../constants/seatPrices.ts';  // Import seat prices

const BookingTicket: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const location = useLocation();
  const navigate = useNavigate();  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const { cinemaInfo, showtime, date } = location.state || {};
  const { t } = useTranslation();  // Initialize translation function

  const initialSeats = () => {
    const seats: { [key: string]: string } = {};
    const conditions: { [key: string]: string } = {};
    const rows = 'ABCDEFGHJ'.split('');
    const numSeats = 8;

    rows.forEach(row => {
      for (let i = 1; i <= numSeats; i++) {
        const seatId = `${row}${i}`;
        seats[seatId] = 'available';
        conditions[seatId] = row === 'J' ? 'sweetbox' : 'standard';
      }
    });

    return { seats, conditions };
  };

  const { seats, conditions } = initialSeats();

  const [seatStatus, setSeatStatus] = useState<{ [key: string]: string }>(seats);
  const [seatCondition, setSeatCondition] = useState<{ [key: string]: string }>(conditions);

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
    const seatNumber = parseInt(seat.slice(1), 10);
    const adjacentSeat = `${seat[0]}${seatNumber % 2 === 0 ? seatNumber - 1 : seatNumber + 1}`;

    const newStatus = { ...seatStatus };

    if (isSweetbox) {
      if (seatStatus[seat] === 'checked') {
        newStatus[seat] = 'available';
        newStatus[adjacentSeat] = 'available';
      } else {
        newStatus[seat] = 'checked';
        newStatus[adjacentSeat] = 'checked';
      }
    } else {
      newStatus[seat] = seatStatus[seat] === 'checked' ? 'available' : 'checked';
    }

    setSeatStatus(newStatus);
    setSelectedSeats(Object.keys(newStatus).filter(key => newStatus[key] === 'checked'));
  };

  const calculatePrice = () => {
    let price = 0;
    selectedSeats.forEach(seat => {
      const condition = seatCondition[seat];
      price += SEAT_PRICES[condition] || SEAT_PRICES['standard'];
    });
    return price;
  };

  const handleNextClick = async () => {
    if (selectedSeats.length === 0) {
      alert(t('booking.alert'));  // Use translated alert
      return;
    }

    const showtimeId = location.pathname.split('/').pop();
    if (showtimeId) {
      try {
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
            date,
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
      <ShowtimeInfo movie={movie} cinemaInfo={cinemaInfo} showtime={showtime} date={date} />

      <SeatSelection
        seatStatus={seatStatus}
        seatCondition={seatCondition}
        handleSeatClick={handleSeatClick}
        selectedSeats={selectedSeats}
        SEAT_PRICES={SEAT_PRICES}  // Pass prices for tooltip
      />

      <BookingSummary
        movie={movie}
        cinemaInfo={cinemaInfo}
        showtime={showtime}
        date={date}
        selectedSeats={selectedSeats}
        calculatePrice={calculatePrice}
        handleNextClick={handleNextClick}
        navigate={navigate}  
      />
    </div>
  );
};

export default BookingTicket;
