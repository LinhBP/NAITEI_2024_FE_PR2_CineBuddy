import React from 'react';
import { Movie, Showtime } from '../../utils/api.ts';
import { useTranslation } from 'react-i18next';

interface ShowtimeDisplayProps {
  selectedCinema: string | null;
  dates: string[];
  selectedDate: string | null;
  handleDateClick: (date: string) => void;
  movies: Movie[];
  showtimes: Showtime[];
  handleShowtimeClick: (movieId: number, showtimeId: number, cinemaName: string, showtimeTime: string) => void;
}

const ShowtimeDisplay: React.FC<ShowtimeDisplayProps> = ({
  selectedCinema,
  dates,
  selectedDate,
  handleDateClick,
  movies,
  showtimes,
  handleShowtimeClick,
}) => {
  const { t } = useTranslation(); // Use translation hook directly

  return (
    <>
      {selectedCinema && (
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="home-title text-white text-center sm:text-left">
              <h3>{t('cinema.title')}</h3>
            </div>
            <div className="text-white text-center sm:text-right">
              <h3>{selectedCinema}</h3>
            </div>
          </div>

          {dates.length > 0 && (
            <div className="flex flex-wrap justify-center mb-6 gap-3">
              {dates.map((date) => (
                <button
                  key={date}
                  className={`flex items-center border-2 rounded-md p-2 sm:p-3 w-[80px] sm:w-[100px] h-[50px] sm:h-[60px] bg-gray-200 ${
                    selectedDate === date ? 'border-black' : 'border-transparent'
                  } hover:border-black`}
                  onClick={() => handleDateClick(date)}
                >
                  <div className="flex flex-col items-start mr-2">
                    <span className="text-xs sm:text-sm text-gray-600">{date.slice(3, 5)}</span>
                    <span className="text-xs sm:text-sm text-gray-600">{new Date(date).toLocaleString('en-US', { weekday: 'short' })}</span>
                  </div>
                  <div className="flex-grow text-xl sm:text-3xl font-normal text-gray-600">{date.slice(0, 2)}</div>
                </button>
              ))}
            </div>
          )}

          {selectedDate && movies.length > 0 && (
            <div className="p-4 sm:p-6 rounded-lg">
              {movies.map((movie) => (
                <div key={movie.id} className="mb-6 flex flex-col sm:flex-row items-center">
                  <img src={movie.image} alt={movie.title} className="w-24 h-36 sm:w-32 sm:h-48 mb-4 sm:mb-0 sm:mr-6"/>
                  <div>
                    <h3 className="font-bold mb-2 text-center sm:text-left">{t(movie.title)}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {showtimes
                        .filter(
                          (showtime) =>
                            showtime.cinemaName === selectedCinema &&
                            showtime.date === selectedDate &&
                            showtime.movieId === Number(movie.id)
                        )
                        .map((showtime) => (
                          <div
                            key={showtime.id}
                            className="bg-gray-500 text-white rounded"
                          >
                            {showtime.timeshowing.map((t) => (
                              <button
                                key={t.id}
                                onClick={() => handleShowtimeClick(movie.id, showtime.id, selectedCinema!, t.time)}
                                className="border border-white hover:border-black px-2 py-1 rounded text-white"
                              >
                                {t.time}
                              </button>
                            ))}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShowtimeDisplay;
