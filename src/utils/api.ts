// src/utils/api.ts

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

export interface Showtime {
  id: number;
  movieId: number;
  city: string;
  cinemaName: string;
  movieType: string;
  date: string;
  showtimes: { id: number; time: string }[];
}

const MOVIE_LIKES_KEY = 'movieLikes';
const LIKED_MOVIES_KEY = 'likedMovies';

// Fetch movies from the server
export const fetchMovies = async (): Promise<Movie[]> => {
  const response = await fetch(`${process.env.REACT_APP_API_HOST}/movies`);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  const movies: Movie[] = await response.json();
  return movies;
};

// Fetch movie details by ID directly from the API
export const fetchMovieDetails = async (id: number): Promise<Movie | undefined> => {
  const response = await fetch(`${process.env.REACT_APP_API_HOST}/movies/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch movie details with ID: ${id}`);
  }
  const movie = await response.json() as Movie;
  return movie;
};

// Fetch movie showtimes by movie ID, city, date, and type from the API
export const fetchMovieShowtimes = async (movieId: number, date?: string, city?: string, type?: string): Promise<Showtime[]> => {
  let url = `${process.env.REACT_APP_API_HOST}/showtimes?movieId=${movieId}`;
  if (date) url += `&date=${date}`;
  if (city) url += `&city=${city}`;
  if (type) url += `&type=${type}`;

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

// Initialize like state from localStorage or default values
export const initializeLikes = (movies: Movie[], isLoggedIn: boolean): { likes: { [key: number]: number }, hasLiked: { [key: number]: boolean } } => {
  const likes: { [key: number]: number } = {};
  const hasLiked: { [key: number]: boolean } = {};

  if (isLoggedIn) {
    const savedLikes = JSON.parse(localStorage.getItem(MOVIE_LIKES_KEY) || '{}');
    const likedMovies = JSON.parse(localStorage.getItem(LIKED_MOVIES_KEY) || '{}');

    movies.forEach(movie => {
      likes[movie.id] = savedLikes[movie.id] ?? movie.like_number;
      hasLiked[movie.id] = likedMovies[movie.id] ?? false;
    });
  } else {
    movies.forEach(movie => {
      likes[movie.id] = movie.like_number;
      hasLiked[movie.id] = false;
    });
  }

  return { likes, hasLiked };
};

// Update like count for a movie and sync with local storage and backend
export const updateLikeCount = (movieId: number, newLikeCount: number, isLoggedIn: boolean): void => {
  if (isLoggedIn) {
    const likes = JSON.parse(localStorage.getItem(MOVIE_LIKES_KEY) || '{}');
    likes[movieId] = newLikeCount;
    localStorage.setItem(MOVIE_LIKES_KEY, JSON.stringify(likes));
  }

  syncLikeCountWithBackend(movieId, newLikeCount);
};

// Sync like count with backend (optional)
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

// Toggle like status and update local storage and backend
export const toggleLike = (movieId: number, currentHasLiked: boolean, likes: { [key: number]: number }, isLoggedIn: boolean) => {
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
