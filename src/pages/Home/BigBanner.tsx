// src/pages/Home/BigBanner.tsx

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Keyboard, Autoplay } from "swiper/modules";
import { Banner } from "../../types/types.ts";
import { useTranslation } from "react-i18next";

interface BigBannerProps {
  bannerList: Banner[];
}

const BigBanner: React.FC<BigBannerProps> = ({ bannerList }) => {
  const { t } = useTranslation();

  return (
    <div className="!mt-14 bg-[url('/public/images/bg_c_bricks.png')] flex justify-center">
      <div className="mx-auto container">
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={{ clickable: true }}
          keyboard={true}
          autoplay={true}
          modules={[Navigation, Pagination, Keyboard, Autoplay]}
          className="mySwiper banner-swiper"
        >
          {bannerList.map((banner) => (
            <SwiperSlide
              key={banner.id}
              className="cursor-pointer flex justify-center items-center"
            >
              <img
                src={banner.image}
                alt={t("home.banner_alt", { id: banner.id })}
                className="lg:h-[551px] lg:w-[980px] mx-auto md:w-full md:h-auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BigBanner;
