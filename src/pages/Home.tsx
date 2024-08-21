import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Keyboard, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TicketButton from '../components/TicketButton.tsx';
import ShowtimeModal from '../components/ShowtimeModal.tsx';
import "../index.css";
import "../style/Home.css";

// Define data type
interface Banner {
  id: number;
  image: string;
}

interface Movie {
  id: number;
  title: string;
  image: string;
  dangChieu: boolean;
}

interface Event {
  title: string | undefined;
  id: number;
  image: string;
}

interface Service {
  title: string | undefined;
  id: number;
  image: string;
}

interface LeftSmallBanner {
  id: number;
  image: string;
}

interface RightSmallBanner {
  id: number;
  image: string;
}

interface PopupBanner {
  id: number;
  image: string;
}

interface GifBanner {
  id: number;
  image: string;
}

interface Voucher {
  title: string;
  id: number;
  image: string;
}

const Home: React.FC = () => {
  const [bannerList, setBannerList] = useState<Banner[]>([]);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [eventList, setEventList] = useState<Event[]>([]);
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [leftSmallBanners, setLeftSmallBanners] = useState<LeftSmallBanner[]>(
    []
  );
  const [rightSmallBanners, setRightSmallBanners] = useState<
    RightSmallBanner[]
  >([]);
  const [voucherList, setVoucherList] = useState<Voucher[]>([]);
  const [popupBanner, setPopupBanner] = useState<PopupBanner | null>(null);
  const [gifBanner, setGifBanner] = useState<GifBanner | null>(null);
  const [showPopup, setShowPopup] = useState(true);
  const [showGif, setShowGif] = useState(true);
  const [isFetchingMovieList, setIsFetchingMovieList] = useState(true);
  const [activeTab, setActiveTab] = useState<"cgv" | "promotion">("cgv");
  const [modal, setModal] = useState<boolean | null>(null); // Modal state
  const navigate = useNavigate();
  const { t } = useTranslation();

  const menuItems = [
    { className: "bg-menu-1" },
    { className: "bg-menu-2" },
    { className: "bg-menu-3" },
    { className: "bg-menu-4" },
    { className: "bg-menu-5" },
    { className: "bg-menu-6" },
    { className: "bg-menu-7" },
  ];

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bannerResponse = await fetch(`${process.env.REACT_APP_API_HOST}/banners`);
        const movieResponse = await fetch(`${process.env.REACT_APP_API_HOST}/movies`);
        const eventResponse = await fetch(`${process.env.REACT_APP_API_HOST}/events`);
        const serviceResponse = await fetch(`${process.env.REACT_APP_API_HOST}/services`);
        const leftSmallBannerResponse = await fetch(
          `${process.env.REACT_APP_API_HOST}/leftSmallBanners`
        );
        const rightSmallBannerResponse = await fetch(
          `${process.env.REACT_APP_API_HOST}/rightSmallBanners`
        );
        const popupBannerResponse = await fetch(
          `${process.env.REACT_APP_API_HOST}/popupBanner`
        );
        const gifBannerResponse = await fetch(`${process.env.REACT_APP_API_HOST}/gifBanner`);
        const voucherResponse = await fetch(`${process.env.REACT_APP_API_HOST}/voucher`);

        const banners: Banner[] = await bannerResponse.json();
        const movies: Movie[] = await movieResponse.json();
        const events: Event[] = await eventResponse.json();
        const services: Service[] = await serviceResponse.json();
        const leftSmallBanners = await leftSmallBannerResponse.json();
        const rightSmallBanners = await rightSmallBannerResponse.json();
        const popupBanner = await popupBannerResponse.json();
        const gifBanner = await gifBannerResponse.json();
        const vouchers: Voucher[] = await voucherResponse.json();

        setBannerList(banners);
        setMovieList(movies);
        setEventList(events);
        setServiceList(services);
        setLeftSmallBanners(leftSmallBanners);
        setRightSmallBanners(rightSmallBanners);
        setPopupBanner(popupBanner);
        setGifBanner(gifBanner);
        setVoucherList(vouchers);
        setIsFetchingMovieList(false);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  if (isFetchingMovieList) return <div>{t("home.loading")}</div>;

  const nowShowingList = movieList.filter((movie) => movie.dangChieu);

  return (
    <div>
      <div>
        {/* Pop-up Banner */}
        {showPopup && popupBanner && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[2000] flex justify-center items-center">
            <img src={popupBanner.image} alt={t("home.popup_banner_alt")} />
            <button
              className="absolute top-2 right-2 bg-transparent text-white border border-white rounded-full w-7 h-7 flex justify-center items-center cursor-pointer"
              onClick={() => setShowPopup(false)}
            >
              &#x2715;
            </button>
          </div>
        )}

        {/* GIF Banner */}
        {showGif && gifBanner && (
          <div className="fixed bottom-0 right-0 w-[120px] z-[2000] flex justify-center items-center">
            <img
              src={gifBanner.image}
              alt={t("home.gif_banner_alt")}
              className="w-full"
            />
            <button
              className="absolute top-2 right-2 bg-gray-500 text-white border border-white rounded-full w-7 h-7 flex justify-center items-center cursor-pointer"
              onClick={() => setShowGif(false)}
            >
              &#x2715;
            </button>
          </div>
        )}

        {/* Small Banners */}
        {leftSmallBanners.map((banner) => (
          <div
            key={banner.id}
            className={`fixed top-0 w-[120px] h-screen bg-transparent z-[1000] hidden md:block ${
              banner.id === 1 ? "left-0" : ""
            }`}
          >
            <img
              src="/images/left-banner.png"
              alt={t("home.left_banner_alt", { id: banner.id })}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {rightSmallBanners.map((banner) => (
          <div
            key={banner.id}
            style={{right:0}}
            className={`fixed top-0 w-[120px] h-screen bg-transparent z-[1000] hidden md:block right-0 ${
              banner.id === 1 ? "right-0" : ""
            }`}
          >
            <img
              src="/images/right-banner.png"
              alt={t("home.right_banner_alt", { id: banner.id })}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Home menu */}
        <div className="container py-4 border-b border-black hidden lg:block">
          <ul className="py-4 border-b border-black flex justify-center">
            {menuItems.map((menuItem, index) => (
              <li key={index}>
                <a
                  className={`h-[90px] w-[139px] inline-block cursor-pointer border-r border-black bg-home-menu ${menuItem.className}`}
                ></a>
              </li>
            ))}
          </ul>
        </div>

        {/* Big banner */}
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

        {/* Movies Section */}
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
                  {/* Movie Image Container */}
                  <div className="relative w-[240px] h-[355px] overflow-hidden flex justify-center items-center">
                    <img
                      src={movie.image}
                      alt={t("home.movie_alt", { title: movie.title })}
                      className="h-full w-auto object-cover"
                    />
                    {/* Overlay (Initially hidden, show on hover) */}
                    <div className="overlay absolute inset-0 bg-[url('/public/images/bg-transparent-grey.png')] bg-cover cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <div
                        className="h-full w-full flex items-center justify-center"
                        onClick={() => {
                          console.log(`Playing trailer for ${movie.title}`);
                        }}
                      ></div>
                    </div>
                    {/* Movie Details */}
                    <div className="absolute bottom-0 left-0 z-[999] w-full text-white font-bold text-[15px] py-[10px] bg-[url('/public/images/bg-black-transparent.png')] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h2 className="uppercase">{t(movie.title)}</h2>
                      <div className="title-content flex justify-evenly items-center mt-10">
                        <button
                          className="flex items-center px-[8px] py-[7px] rounded-[5px] text-[13px] border-none cursor-pointer bg-red-700 text-white hover:bg-red-900"
                          onClick={() => {
                            window.scrollTo(0, 0); // Ensure page scrolls to the top
                            navigate(`/movie-detail/${movie.id}`); // Update to navigate to the correct path
                          }}
                        >
                          {t("home.view_details")}
                        </button>
                        <TicketButton maPhim={movie.id} setModal={setModal} />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Event Section */}
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

        {/* Service Section */}
        <div className="flex justify-center border-y-2 border-black container gap-5 !my-7 py-7 text-center mx-auto">
          {serviceList.map((service) => (
            <div
              key={service.id}
              className="p-[3px] border-black border-2 cursor-pointer h-auto hover:opacity-80"
            >
              <img
                src={service.image}
                alt={t("home.service_image_alt", { title: service.title })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Showtime Modal */}
      {modal && (
        <ShowtimeModal
          maPhim={0} // No specific movie ID needed here; adjust logic as necessary
          modal={modal}
          setModal={setModal}
        />
      )}
    </div>
  );
};

export default Home;
