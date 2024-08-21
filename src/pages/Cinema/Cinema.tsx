import React, { useEffect, useState } from 'react';
import { fetchMovies, fetchMovieShowtimes } from '../../utils/api.ts';
import { Movie, Showtime } from '../../utils/api.ts';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import '../../style/Cinema.css';

const Cinema: React.FC = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cinemas, setCinemas] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCinema, setSelectedCinema] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const { t } = useTranslation(); // Use translation hook
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShowtimesData = async () => {
      try {
        const allShowtimes = await fetchMovieShowtimes();

        const citiesSet = new Set<string>();
        const cinemasSet = new Set<string>();

        allShowtimes.forEach((showtime) => {
          citiesSet.add(showtime.city);
          if (showtime.city === selectedCity) {
            cinemasSet.add(showtime.cinemaName);
          }
        });

        setCities(Array.from(citiesSet));
        setCinemas(Array.from(cinemasSet));
        setShowtimes(allShowtimes);
      } catch (error) {
        console.error('Error fetching showtimes data:', error);
      }
    };

    fetchShowtimesData();
  }, [selectedCity]);

  useEffect(() => {
    if (selectedCinema) {
      const availableDates = Array.from(
        new Set(
          showtimes
            .filter((showtime) => showtime.cinemaName === selectedCinema)
            .map((showtime) => showtime.date)
        )
      );
      setDates(availableDates);
    }
  }, [selectedCinema, showtimes]);

  useEffect(() => {
    const fetchMoviesData = async () => {
      if (selectedCinema && selectedDate) {
        try {
          const relevantShowtimes = showtimes.filter(
            (showtime) =>
              showtime.cinemaName === selectedCinema && showtime.date === selectedDate
          );

          const movieIds = Array.from(new Set(relevantShowtimes.map((showtime) => showtime.movieId)));

          const moviesResponse = await fetchMovies();
          const filteredMovies = moviesResponse.filter((movie) =>
            movieIds.includes(Number(movie.id))
          );

          setMovies(filteredMovies);
        } catch (error) {
          console.error('Error fetching movies data:', error);
        }
      } else {
        setMovies([]); // Clear movies if no cinema or date is selected
      }
    };

    fetchMoviesData();
  }, [selectedCinema, selectedDate, showtimes]);

  const handleCityClick = (city: string) => {
    setSelectedCity(city);
    setSelectedCinema(null);
    setSelectedDate(null);
    setMovies([]);
  };

  const handleCinemaClick = (cinema: string) => {
    setSelectedCinema(cinema);
    setSelectedDate(null);
    setMovies([]);
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleShowtimeClick = (movieId: number, showtimeId: number, cinemaName: string, showtimeTime: string) => {
    navigate(`/booking/${movieId}/${showtimeId}`, {
      state: {
        movieTitle: movies.find((movie) => movie.id === movieId)?.title || '',
        cinemaInfo: cinemaName,
        showtime: showtimeTime,
        date: selectedDate,
      },
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-10 lg:px-20 py-8">
      <div>
        <div>
          <div className="w-full">
            <div
              className="bg-cover bg-center w-full md:block hidden"
              style={{
                backgroundImage: 'url(/images/cinema-showtimes-favorite-top.png)',
                height: '45px',
              }}
            ></div>

            <div
              className="bg-repeat-y bg-center w-full"
              style={{
                backgroundImage: 'url(/images/cinema-showtimes-favorite-center.png)',
                backgroundSize: 'contain',
              }}
            >
              <div className="px-4 py-6">
                <div className="text-center mb-4">
                  <h1 className="text-[#717171] text-3xl sm:text-4xl lg:text-5xl font-bold text-center" style={{ textShadow: '2px 2px 2px #b9b9b9' }}>
                    {t(`cinema.title`).toUpperCase()}
                  </h1>
                </div>

                <div className="border-b-[3px] border-gray-300 mx-4 sm:mx-10 my-10 opacity-30"></div>

                <div className="mb-6">
                  <ul className="flex flex-wrap justify-center gap-4">
                    {cities.map((city) => (
                      <li key={city}>
                        <span
                          onClick={() => handleCityClick(city)}
                          className={`cursor-pointer ${
                            selectedCity === city ? 'text-red-600' : 'text-white'
                          }`}
                        >
                          {city}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-b-[3px] border-gray-300 mx-4 sm:mx-10 my-10 opacity-30"></div>

                {selectedCity && (
                  <div className="mb-4">
                    <ul className="flex flex-wrap justify-center gap-4">
                      {cinemas.map((cinema) => (
                        <li key={cinema}>
                          <span
                            onClick={() => handleCinemaClick(cinema)}
                            className={`cursor-pointer px-2 py-1 sm:px-4 sm:py-2 rounded ${
                              selectedCinema === cinema ? 'bg-red-600 text-white' : 'bg-gray-800 text-white'
                            }`}
                          >
                            {cinema}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div
              className="bg-cover bg-center w-full md:block hidden"
              style={{
                backgroundImage: 'url(/images/cinema-showtimes-favorite-top.png)',
                height: '45px',
                transform: 'rotate(180deg)',
              }}
            ></div>
          </div>

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
        </div>
      </div>
    </div>
  );
};

export default Cinema;
