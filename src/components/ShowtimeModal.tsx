import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { fetchMovieShowtimes, Showtime, fetchMovieDetails } from '../utils/api.ts';
import { useTranslation } from 'react-i18next';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface ShowtimeModalProps {
  movieId: number;
  modal: boolean | null;
  setModal: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const ShowtimeModal: React.FC<ShowtimeModalProps> = ({ modal, setModal, movieId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [movieTitle, setMovieTitle] = useState<string>('');

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails(movieId).then((movie) => {
        if (movie) {
          setMovieTitle(movie.title);
        }
      });
    }
  }, [movieId]);

  useEffect(() => {
    if (modal && movieId) {
      fetchMovieShowtimes(movieId).then((data) => {
        setShowtimes(data);

        const dates = Array.from(new Set(data.map((showtime) => showtime.date)));
        const cities = Array.from(new Set(data.map((showtime) => showtime.city)));
        const types = Array.from(new Set(data.map((showtime) => showtime.movieType)));

        setAvailableDates(dates);
        setAvailableCities(cities);
        setAvailableTypes(types);

        if (dates.length > 0) setSelectedDate(dates[0]);
        if (cities.length > 0) setSelectedCity(cities[0]);
        if (types.length > 0) setSelectedType(types[0]);
      });
    }
  }, [modal, movieId]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  const getFormattedDate = (date: string) => {
    const [day, month] = date.split('-');
    const dateObj = new Date(`${month}-${day}-2024`);
    const dayOfWeek = dateObj.toLocaleString('en-US', { weekday: 'short' });
    const formattedMonth = dateObj.toLocaleString('en-US', { month: '2-digit' });
    return { dayOfWeek, formattedMonth, day };
  };

  const handleShowtimeClick = (showtimeId: number, cinemaName: string, showtimeTime: string) => {
    navigate(`/booking/${movieId}/${showtimeId}`, {
      state: {
        movieTitle: movieTitle,
        cinemaInfo: `${cinemaName}, ${selectedCity}`,
        showtime: showtimeTime,
        date: selectedDate,
      },
    });
  };

  return (
    <Modal
      open={!!modal}
      onCancel={() => setModal(null)}
      footer={null}
      closeIcon={<CloseCircleOutlined className="text-black text-2xl bg-[#fdfcf0] my-[10px]" />}
      width="90vw"
      centered={false}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="w-full h-full max-w-[85vw] max-h-[90vh] bg-[#fdfcf0] p-4 overflow-y-auto">
        <div className="flex flex-wrap gap-3">
          {availableDates.map((date) => {
            const { dayOfWeek, formattedMonth, day } = getFormattedDate(date);

            return (
              <button
                key={date}
                className={`flex items-center border-2 rounded-md p-3 w-[100px] h-[60px] ${
                  selectedDate === date ? 'border-black' : 'border-transparent'
                } hover:border-black`}
                onClick={() => handleDateChange(date)}
              >
                <div className="flex flex-col items-start mr-2">
                  <span className="text-sm text-gray-600">{formattedMonth}</span>
                  <span className="text-sm text-gray-600">{dayOfWeek}</span>
                </div>
                <div className="flex-grow text-3xl font-normal text-gray-600">{day}</div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex gap-2">
          {availableCities.map((city) => (
            <button
              key={city}
              className={`px-4 py-2 border rounded-md ${
                selectedCity === city ? 'bg-black text-white' : 'bg-white text-black'
              } hover:bg-black hover:text-white`}
              onClick={() => handleCityChange(city)}
            >
              {city}
            </button>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          {availableTypes.map((type) => (
            <button
              key={type}
              className={`px-4 py-2 border rounded-md ${
                selectedType === type ? 'bg-black text-white' : 'bg-white text-black'
              } hover:bg-black hover:text-white`}
              onClick={() => handleTypeChange(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {showtimes.length > 0 ? (
            showtimes
              .filter(
                (showtime) =>
                  showtime.date === selectedDate &&
                  showtime.city === selectedCity &&
                  showtime.movieType === selectedType
              )
              .map((cinema) => (
                <div key={cinema.cinemaName} className="mb-4">
                  <h3 className="font-bold">{cinema.cinemaName}</h3>
                  <div className="flex gap-2 mt-2">
                    {cinema.timeshowing.map((timeshowing) => (
                      <button
                        key={timeshowing.id}
                        className="px-3 py-1 border rounded-md hover:bg-black hover:text-white"
                        onClick={() => handleShowtimeClick(timeshowing.id, cinema.cinemaName, timeshowing.time)}
                      >
                        {timeshowing.time}
                      </button>
                    ))}
                  </div>
                </div>
              ))
          ) : (
            <p className="text-center text-gray-500">{t('showtimes.no_showtimes')}</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ShowtimeModal;
