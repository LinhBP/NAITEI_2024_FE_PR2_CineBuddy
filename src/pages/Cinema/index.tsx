import React, { useEffect, useState } from 'react';
import { fetchMovies, fetchMovieShowtimes } from '../../utils/api.ts';
import { Movie, Showtime } from '../../utils/api.ts';
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import '../../style/Cinema.css';

import CinemaSelection from './CinemaSelection.tsx';
import ShowtimeDisplay from './ShowtimeDisplay.tsx';

const Cinema: React.FC = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cinemas, setCinemas] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCinema, setSelectedCinema] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [allShowtimes, setAllShowtimes] = useState<Showtime[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allShowtimesResponse, allMoviesResponse] = await Promise.all([
          fetchMovieShowtimes(),
          fetchMovies(),
        ]);

        setAllShowtimes(allShowtimesResponse);
        setAllMovies(allMoviesResponse);

        const citiesSet = new Set<string>(allShowtimesResponse.map((showtime) => showtime.city));
        setCities(Array.from(citiesSet));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    if (selectedCity) {
      const cinemasSet = new Set<string>(
        allShowtimes.filter((showtime) => showtime.city === selectedCity).map((showtime) => showtime.cinemaName)
      );
      setCinemas(Array.from(cinemasSet));
      setShowtimes(allShowtimes.filter((showtime) => showtime.city === selectedCity));
    }
  }, [selectedCity, allShowtimes]);

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
    if (selectedCinema && selectedDate) {
      const relevantShowtimes = showtimes.filter(
        (showtime) => showtime.cinemaName === selectedCinema && showtime.date === selectedDate
      );

      const movieIds = Array.from(new Set(relevantShowtimes.map((showtime) => showtime.movieId)));
      const filteredMovies = allMovies.filter((movie) => movieIds.includes(Number(movie.id)));

      setMovies(filteredMovies);
    } else {
      setMovies([]);
    }
  }, [selectedCinema, selectedDate, showtimes, allMovies]);

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
      <CinemaSelection 
        cities={cities} 
        selectedCity={selectedCity} 
        handleCityClick={handleCityClick} 
        cinemas={cinemas} 
        selectedCinema={selectedCinema} 
        handleCinemaClick={handleCinemaClick} 
      />
      <ShowtimeDisplay 
        selectedCinema={selectedCinema} 
        dates={dates} 
        selectedDate={selectedDate} 
        handleDateClick={handleDateClick} 
        movies={movies} 
        showtimes={showtimes} 
        handleShowtimeClick={handleShowtimeClick} 
      />
    </div>
  );
};

export default Cinema;
