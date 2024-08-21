// src/pages/Home/EventSection.tsx

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { Event, Voucher } from "../../types/types.ts";
import { TFunction } from "i18next";

interface EventSectionProps {
  eventList: Event[];
  voucherList: Voucher[];
  activeTab: "cgv" | "promotion";
  setActiveTab: (tab: "cgv" | "promotion") => void;
  t: TFunction;
}

const EventSection: React.FC<EventSectionProps> = ({
  eventList,
  voucherList,
  activeTab,
  setActiveTab,
  t,
}) => {
  const eventTabs = [
    {
      text: t("home.cgv_members"),
      icon: "/images/ico_finger.png",
      id: "cgv",
    },
    {
      text: t("home.new_promotion"),
      icon: "/images/ico_finger.png",
      id: "promotion",
    },
  ];

  return (
    <div className="lg:w-[980px] container mx-auto">
      <div className="bg-[url('/public/images/bg_h3_line.jpg')] bg-repeat-x bg-center text-center">
        <img
          src="/images/h3_event.gif"
          className="inline-block sm:w-3/10"
        />
      </div>
      <ul className="text-center mt-8">
        {eventTabs.map((tab) => (
          <li
            key={tab.id}
            className={`inline-block bg-[#e71a0f] h-[40px] leading-[40px] text-white cursor-pointer bg-no-repeat ${
              tab.id === "cgv"
                ? "bg-[url('/public/images/ribon_left_menu.gif')] bg-left px-[10px] pl-[25px]"
                : "bg-[url('/public/images/ribon_right.gif')] bg-right px-[10px] pr-[25px]"
            }`}
            onClick={() => setActiveTab(tab.id as "cgv" | "promotion")}
          >
            {activeTab === tab.id && (
              <img
                src={tab.icon}
                alt={t("home.finger_icon_alt")}
                className="inline-block mr-[15px]"
              />
            )}
            {tab.text}
          </li>
        ))}
      </ul>
      <div className="event-content mt-8">
        <Swiper
          slidesPerView={4}
          spaceBetween={0}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper event-swiper"
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {(activeTab === "cgv" ? eventList : voucherList).map((item) => (
            <SwiperSlide key={item.id}>
              <img
                src={item.image}
                alt={t("home.event_or_voucher_alt", {
                  title: item.title || "Voucher Image",
                })}
                className="w-full h-auto object-cover hover:opacity-80"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default EventSection;
