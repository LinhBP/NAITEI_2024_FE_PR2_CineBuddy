//src/pages/UserAccess/UserFormContainer.tsx

import React, { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import { useTranslation } from 'react-i18next'; 
import "../../style/UserFormContainer.css";

interface UserFormContainerProps {
  children: ReactNode;
}

const UserFormContainer: FC<UserFormContainerProps> = ({ children }) => {
  const { t } = useTranslation(); 

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen p-5">
        <div className="flex container mx-auto my-10 max-w-[980px]">
          {/* User Form Section */}
          <div className="w-full md:w-1/2">
            <div className="flex justify-evenly bg-[#E71A0F] text-[#ddd] text-md font-bold mb-5">
              <div>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `inline-block text-center w-full pt-[15px] pb-[10px] ${isActive ? 'border-b-4 border-white text-white' : ''}`
                  }
                >
                  {t('userform.login')} 
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `inline-block text-center w-full pt-[15px] pb-[10px] ${isActive ? 'border-b-4 border-white text-white' : ''}`
                  }
                >
                  {t('userform.register')} 
                </NavLink>
              </div>
            </div>
            <div>{children}</div>
          </div>

          {/* Promotions Swiper Section */}
          <div className="hidden md:block md:w-2/5 ml-5">
            <Swiper
              cssMode={true}
              navigation
              pagination={{ clickable: true }}
              mousewheel
              keyboard
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img
                  src="/images/form1.jpg"
                  alt="Promotion 1"
                  className="w-full h-auto pb-10 border border-gray-300 object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/images/form2.jpg"
                  alt="Promotion 2"
                  className="w-full h-auto pb-10 border border-gray-300 object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/images/form3.jpg"
                  alt="Promotion 3"
                  className="w-full h-auto pb-10 border border-gray-300 object-cover"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFormContainer;
