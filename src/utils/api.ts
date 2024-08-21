// src/utils/api.ts

import { convertParamsToQueryString } from './queryConvert.ts';

// Define the Movie interface
export interface Movie {
  rated: string;
  sapChieu: boolean;
  id: number;
  title: string;
  image: string;
  trailer: string;
  description: string;
  dangChieu: boolean;
  genre: string;
  duration: string;
  release_date: string;
  like_number: number;
  rating?: number;
  language?: string;
}

// Define the Showtime interface
export interface Showtime {
  id: number;
  movieId: number;
  city: string;
  cinemaName: string;
  movieType: string;
  date: string;
  timeshowing: { id: number; time: string }[];
}

// Define the SeatData interface
export interface SeatData {
  seatStatus: { [key: string]: string };
  seatCondition: { [key: string]: string };
}

const MOVIE_LIKES_KEY = 'movieLikes';
const LIKED_MOVIES_KEY = 'likedMovies';

// Fetch the list of movies
export const fetchMovies = async (): Promise<Movie[]> => {
  const response = await fetch(`${process.env.REACT_APP_API_HOST}/movies`);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  const movies: Movie[] = await response.json();
  return movies;
};

// Fetch details of a specific movie
export const fetchMovieDetails = async (id: number): Promise<Movie | undefined> => {
  const response = await fetch(`${process.env.REACT_APP_API_HOST}/movies/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch movie details with ID: ${id}`);
  }
  const movie = await response.json() as Movie;
  return movie;
};

// Fetch the showtimes for movies based on various filters
export const fetchMovieShowtimes = async (
  movieId?: number,
  date?: string,
  city?: string,
  type?: string
): Promise<Showtime[]> => {
  const params = {
    movieId,
    date,
    city,
    type,
  };

  const queryString = convertParamsToQueryString(params); // Convert parameters to a query string
  const url = `${process.env.REACT_APP_API_HOST}/showtimes?${queryString}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch movie showtimes');
    }
    const showtimes: Showtime[] = await response.json();
    return showtimes;
  } catch (error) {
    console.error('Error fetching movie showtimes:', error);
    return [];
  }
};

// Fetch seat data for a specific showtime
export const fetchSeatData = async (showtimeId: number): Promise<SeatData | undefined> => {
  const response = await fetch(`${process.env.REACT_APP_API_HOST}/showtimes/${showtimeId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch seat data for showtime ID: ${showtimeId}`);
  }
  const data = await response.json();
  return { seatStatus: data.seatStatus, seatCondition: data.seatCondition };
};

// Update the seat status to "occupied" for the selected seats
export const updateSeatStatus = async (showtimeId: number, selectedSeats: string[]): Promise<void> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/showtimes/${showtimeId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seatStatus: selectedSeats.reduce((acc, seat) => {
          acc[seat] = 'occupied';
          return acc;
        }, {} as { [key: string]: string })
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update seat status');
    }
  } catch (error) {
    console.error('Error updating seat status:', error);
  }
};

// Initialize the like status and count for movies based on user login state
export const initializeLikes = (
  movies: Movie[],
  isLoggedIn: boolean
): { likes: { [key: number]: number }; hasLiked: { [key: number]: boolean } } => {
  const likes: { [key: number]: number } = {};
  const hasLiked: { [key: number]: boolean } = {};

  if (isLoggedIn) {
    const savedLikes = JSON.parse(localStorage.getItem(MOVIE_LIKES_KEY) || '{}');
    const likedMovies = JSON.parse(localStorage.getItem(LIKED_MOVIES_KEY) || '{}');

    movies.forEach((movie) => {
      likes[movie.id] = savedLikes[movie.id] ?? movie.like_number;
      hasLiked[movie.id] = likedMovies[movie.id] ?? false;
    });
  } else {
    movies.forEach((movie) => {
      likes[movie.id] = movie.like_number;
      hasLiked[movie.id] = false;
    });
  }

  return { likes, hasLiked };
};

// Update the like count for a movie and sync with backend
export const updateLikeCount = (movieId: number, newLikeCount: number, isLoggedIn: boolean): void => {
  if (isLoggedIn) {
    const likes = JSON.parse(localStorage.getItem(MOVIE_LIKES_KEY) || '{}');
    likes[movieId] = newLikeCount;
    localStorage.setItem(MOVIE_LIKES_KEY, JSON.stringify(likes));
  }

  syncLikeCountWithBackend(movieId, newLikeCount);
};

// Sync the like count with the backend
const syncLikeCountWithBackend = async (movieId: number, newLikeCount: number): Promise<void> => {
  try {
    await fetch(`${process.env.REACT_APP_API_HOST}/movies/${movieId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ like_number: newLikeCount }),
    });
  } catch (error) {
    console.error(`Failed to sync like count for movie ID ${movieId}`, error);
  }
};

// Toggle the like status for a movie and update the like count
export const toggleLike = (
  movieId: number,
  currentHasLiked: boolean,
  likes: { [key: number]: number },
  isLoggedIn: boolean
) => {
  const newHasLiked = !currentHasLiked;
  const newLikesCount = newHasLiked ? likes[movieId] + 1 : likes[movieId] - 1;

  if (isLoggedIn) {
    const likedMovies = JSON.parse(localStorage.getItem(LIKED_MOVIES_KEY) || '{}');
    likedMovies[movieId] = newHasLiked;
    localStorage.setItem(LIKED_MOVIES_KEY, JSON.stringify(likedMovies));

    const updatedLikes = { ...likes, [movieId]: newLikesCount };
    localStorage.setItem(MOVIE_LIKES_KEY, JSON.stringify(updatedLikes));
  }

  updateLikeCount(movieId, newLikesCount, isLoggedIn);

  return { newHasLiked, newLikesCount };
};
