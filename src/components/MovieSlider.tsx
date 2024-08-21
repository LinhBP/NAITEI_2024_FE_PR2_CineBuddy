// src/components/MovieSlider.tsx

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import 'swiper/css/navigation'; 
import { Navigation, Autoplay } from 'swiper/modules'; 
import '../style/MovieSlide.css'; 

import { Movie } from '../utils/api.ts';
import MovieCard from '../components/MovieCard.tsx'; 

interface MovieSliderProps {
  movies: Movie[];
  filterCondition: (movie: Movie) => boolean; 
  hasLiked: { [key: number]: boolean };
  likes: { [key: number]: number };
  onLike: (id: number) => void;
  setModal: (movieId: number) => void; 
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
        delay: 3000, 
        disableOnInteraction: false, 
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
            setModal={() => setModal(movie.id)} 
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MovieSlider;
