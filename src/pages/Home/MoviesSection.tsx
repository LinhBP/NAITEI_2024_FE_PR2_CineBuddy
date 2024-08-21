// src/pages/Home/MovieSection.tsx

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { Movie } from "../../types/types.ts";
import TicketButton from "../../components/TicketButton.tsx"; 
import { NavigateFunction } from "react-router-dom";
import { useTranslation } from "react-i18next"; 

interface MoviesSectionProps {
  movieList: Movie[];
  navigate: NavigateFunction;
  setModal: (movieId: number) => void; // Update prop type to accept movieId
}

const MoviesSection: React.FC<MoviesSectionProps> = ({
  movieList,
  navigate,
  setModal,
}) => {
  const { t } = useTranslation(); 

  const nowShowingList = movieList.filter((movie) => movie.dangChieu);

  return (
    <div className="home-selection !my-28 lg:mx-auto lg:w-[980px]">
      <div className="bg-[url('/public/images/bg_h3_line.jpg')] bg-repeat-x bg-center text-center">
        <img
          src="/images/h3_movie_selection.gif"
          className="inline-block sm:w-2/5 mb-8"
        />
      </div>
      <div className="selection-content mx-auto container relative">
        <Swiper
          slidesPerView={4}
          spaceBetween={5}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper movie-swiper w-full h-full mx-auto overflow-hidden"
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {nowShowingList.map((movie) => (
            <SwiperSlide
              key={movie.id}
              className="group flex justify-center items-center w-[240px] h-[355px] text-center text-[18px] relative z-[1] bg-white"
            >
              <div className="relative w-[240px] h-[355px] overflow-hidden flex justify-center items-center">
                <img
                  src={movie.image}
                  alt={t("home.movie_alt", { title: movie.title })}
                  className="h-full w-auto object-cover"
                />
                <div className="overlay absolute inset-0 bg-[url('/public/images/bg-transparent-grey.png')] bg-cover cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div
                    className="h-full w-full flex items-center justify-center"
                    onClick={() => {
                      console.log(`Playing trailer for ${movie.title}`);
                    }}
                  ></div>
                </div>
                <div className="absolute bottom-0 left-0 z-[999] w-full text-white font-bold text-[15px] py-[10px] bg-[url('/public/images/bg-black-transparent.png')] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="uppercase">{t(movie.title)}</h2>
                  <div className="title-content flex justify-evenly items-center mt-10">
                    <button
                      className="flex items-center px-[8px] py-[7px] rounded-[5px] text-[13px] border-none cursor-pointer bg-red-700 text-white hover:bg-red-900"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        navigate(`/movie-detail/${movie.id}`);
                      }}
                    >
                      {t("home.view_details")}
                    </button>
                    {/* Pass setModal with the correct movieId */}
                    <TicketButton movieId={movie.id} setModal={() => setModal(movie.id)} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MoviesSection;
