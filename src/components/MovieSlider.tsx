// src/components/MovieSlider.tsx

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation'; // Import navigation styles
import { Navigation, Autoplay } from 'swiper/modules'; // Import necessary modules
import '../style/MovieSlide.css'; // Import custom styles for the slider

import { Movie } from '../utils/api.ts';
import MovieCard from '../components/MovieCard.tsx'; // Import the MovieCard component

interface MovieSliderProps {
  movies: Movie[];
  filterCondition: (movie: Movie) => boolean; // Filter condition for the movies
  hasLiked: { [key: number]: boolean };
  likes: { [key: number]: number };
  onLike: (id: number) => void;
  setModal: (movieId: number) => void; // Updated to receive a function with movieId
}

const MovieSlider: React.FC<MovieSliderProps> = ({
  movies,
  filterCondition,
  hasLiked,
  likes,
  onLike,
  setModal,
}) => {
  return (
    <Swiper
      className="movie-slider"
      spaceBetween={20}
      slidesPerView={2}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      navigation
      autoplay={{
        delay: 3000, // Delay between slides in milliseconds
        disableOnInteraction: false, // Continue auto-sliding after user interaction
      }}
      modules={[Navigation, Autoplay]}
    >
      {movies.filter(filterCondition).map((movie) => (
        <SwiperSlide key={movie.id}>
          <MovieCard
            movie={movie}
            hasLiked={hasLiked[movie.id]}
            likes={likes[movie.id]}
            onLike={onLike}
            setModal={() => setModal(movie.id)} // Set modal with movie ID
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MovieSlider;
