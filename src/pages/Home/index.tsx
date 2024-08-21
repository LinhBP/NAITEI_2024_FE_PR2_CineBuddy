// src/pages/Home/index.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Banner,
  Movie,
  Event,
  Service,
  LeftSmallBanner,
  RightSmallBanner,
  PopupBanner as PopupBannerType,
  GifBanner as GifBannerType,
  Voucher,
} from "../../types/types.ts";
import PopupBanner from "./PopupBanner.tsx";
import GifBanner from "./GifBanner.tsx";
import SmallBanners from "./SmallBanners.tsx";
import HomeMenu from "./HomeMenu.tsx";
import BigBanner from "./BigBanner.tsx";
import MoviesSection from "./MoviesSection.tsx";
import EventSection from "./EventSection.tsx";
import ServiceSection from "./ServiceSection.tsx";
import ShowtimeModal from "../../components/ShowtimeModal.tsx";
import "../../index.css";
import "../../style/Home.css";

const Home: React.FC = () => {
  const [bannerList, setBannerList] = useState<Banner[]>([]);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [eventList, setEventList] = useState<Event[]>([]);
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [leftSmallBanners, setLeftSmallBanners] = useState<LeftSmallBanner[]>([]);
  const [rightSmallBanners, setRightSmallBanners] = useState<RightSmallBanner[]>([]);
  const [voucherList, setVoucherList] = useState<Voucher[]>([]);
  const [popupBanner, setPopupBanner] = useState<PopupBannerType | null>(null);
  const [gifBanner, setGifBanner] = useState<GifBannerType | null>(null);
  const [showPopup, setShowPopup] = useState(true);
  const [showGif, setShowGif] = useState(true);
  const [isFetchingMovieList, setIsFetchingMovieList] = useState(true);
  const [activeTab, setActiveTab] = useState<"cgv" | "promotion">("cgv");
  const [modalVisible, setModalVisible] = useState<boolean | null>(null); // State for modal visibility
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null); // State for selected movie ID
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bannerResponse = await fetch(`${process.env.REACT_APP_API_HOST}/banners`);
        const movieResponse = await fetch(`${process.env.REACT_APP_API_HOST}/movies`);
        const eventResponse = await fetch(`${process.env.REACT_APP_API_HOST}/events`);
        const serviceResponse = await fetch(`${process.env.REACT_APP_API_HOST}/services`);
        const leftSmallBannerResponse = await fetch(`${process.env.REACT_APP_API_HOST}/leftSmallBanners`);
        const rightSmallBannerResponse = await fetch(`${process.env.REACT_APP_API_HOST}/rightSmallBanners`);
        const popupBannerResponse = await fetch(`${process.env.REACT_APP_API_HOST}/popupBanner`);
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

  const handleOpenModal = (movieId: number) => {
    setSelectedMovieId(movieId);
    setModalVisible(true);
  };

  return (
    <div>
      <PopupBanner showPopup={showPopup} popupBanner={popupBanner} setShowPopup={setShowPopup} />
      <GifBanner showGif={showGif} gifBanner={gifBanner} setShowGif={setShowGif} />
      <SmallBanners leftSmallBanners={leftSmallBanners} rightSmallBanners={rightSmallBanners} />
      <HomeMenu menuItems={[
        { className: "bg-menu-1" },
        { className: "bg-menu-2" },
        { className: "bg-menu-3" },
        { className: "bg-menu-4" },
        { className: "bg-menu-5" },
        { className: "bg-menu-6" },
        { className: "bg-menu-7" },
      ]} />
      <BigBanner bannerList={bannerList} />
      <MoviesSection movieList={movieList} navigate={navigate} setModal={handleOpenModal} />
      <EventSection eventList={eventList} voucherList={voucherList} activeTab={activeTab} setActiveTab={setActiveTab} t={t} />
      <ServiceSection serviceList={serviceList} t={t} />
      {modalVisible && selectedMovieId !== null && (
        <ShowtimeModal
          movieId={selectedMovieId} // Pass the selected movieId
          modal={modalVisible}
          setModal={setModalVisible} // This function now controls visibility only
        />
      )}
    </div>
  );
};

export default Home;
