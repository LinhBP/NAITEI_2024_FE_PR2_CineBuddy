import { MenuOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  handleNavigate,
  handleAccountInfoClick,
} from "../utils/navigation.ts";
import { i18n as I18nInstance } from "i18next";
import {
  getLoggedInUserFromSessionStorage,
  getLoggedInUserFromCookies,
  logoutUser,
} from "../utils/UserLocalStorage.ts";

interface AdBanner {
  id: number;
  image: string;
}

const changeLanguage = (
  i18n: I18nInstance,
  lng: string,
  setActiveLang: React.Dispatch<React.SetStateAction<string>>
) => {
  i18n.changeLanguage(lng);
  setActiveLang(lng);
};

const menuItems = [
  {
    title: "header.film",
    children: [
      { title: "header.now_showing", action: "/now-showing" },
      { title: "header.coming_soon", action: "/coming-soon" },
    ],
  },
  {
    title: "header.cinemas",
    children: [
      { title: "header.all_cinemas", action: "/cinema" },
      { title: "header.special_cinemas", action: "#" },
      { title: "header.3d_cinemas", action: "#" },
    ],
  },
  {
    title: "header.members",
    children: [
      { title: "header.cgv_account", action: "/account-info" },
      { title: "header.benefits", action: "#" },
    ],
  },
  {
    title: "header.cultureplex",
    children: [
      { title: "header.online_store", action: "#" },
      { title: "header.rent_and_group", action: "#" },
      { title: "header.e_cgv", action: "#" },
      { title: "header.egift", action: "#" },
      { title: "header.cgv_rules", action: "#" },
    ],
  },
];

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [activeLang, setActiveLang] = useState(i18n.language);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [adBanner, setAdBanner] = useState<AdBanner | null>(null);

  // Check ca sessionStorage and cookies for logged-in user
  const [user, setUser] = useState(
    getLoggedInUserFromSessionStorage() || getLoggedInUserFromCookies()
  );

  useEffect(() => {
    const fetchAdBanner = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_HOST}/adBanner`
        );
        const data: AdBanner = await response.json();
        setAdBanner(data);
      } catch (error) {
        console.error("Failed to fetch ad banner", error);
      }
    };

    fetchAdBanner();
  }, []);

  const handleMenuClick = (menuTitle: string) => {
    setActiveMenu((prevMenu) => (prevMenu === menuTitle ? null : menuTitle));
  };

  const handleLoginLogoutClick = () => {
    if (user) {
      logoutUser(); 
      setUser(null);
      navigate('/');
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      {/* Ad Banner */}
      {adBanner && (
        <div className="mx-auto w-full max-w-[980px] px-4 md:px-0 md:w-[768px] lg:w-[980px]">
          <img src={adBanner.image} alt={t("adBanner.altText")} />
        </div>
      )}

      <div className="hidden sm:block">
        <div className="text-md gap-5 justify-end max-w-screen-lg mt-3 container flex">
          <div className="top-content hidden sm:flex gap-7">
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src="/images/icon_promotion25.png" />
              <span>{t("header.new_and_promotion")}</span>
            </div>
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={() =>
                handleNavigate(navigate, user ? "/account-info" : "/login")
              }
            >
              <img src="/images/booking-ticket.png" />
              <span>{t("header.my_tickets")}</span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <img src="/images/icon-login.png" />
            {!user ? (
              <span
                onClick={() => navigate("/login")}
                className="cursor-pointer"
              >
                {t("header.login_register")}
              </span>
            ) : (
              <span>
                <span
                  onClick={() => handleAccountInfoClick(navigate)}
                  className="cursor-pointer"
                >
                  {`${t("header.hello").toUpperCase()}, ${user.userName?.toUpperCase()}! `}
                </span>
                <span
                  onClick={() => handleLoginLogoutClick()}
                  className="cursor-pointer hover:underline"
                >
                  {t("header.logout").toUpperCase()}
                </span>
              </span>
            )}
          </div>
          <div className="flex items-center">
            <span
              className={`cursor-pointer px-2 py-0.5 rounded-s-xl ${
                activeLang === "vi"
                  ? "bg-red-600 text-white"
                  : "bg-gray-500 text-white"
              }`}
              onClick={() => changeLanguage(i18n, "vi", setActiveLang)}
            >
              {t("header.language.vietnamese")}
            </span>
            <span
              className={`cursor-pointer px-2 py-0.5 rounded-e-xl ${
                activeLang === "en"
                  ? "bg-red-600 text-white"
                  : "bg-gray-500 text-white"
              }`}
              onClick={() => changeLanguage(i18n, "en", setActiveLang)}
            >
              {t("header.language.english")}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full h-[135px] mt-[12px] bg-[url('/public/images/bg-top.png')] bg-contain">
        <div className="container h-full flex justify-center">
          <a
            onClick={() => navigate("/")}
            className="h-full flex items-center cursor-pointer hover:opacity-80"
          >
            <img src="/images/cgvlogo.png" />
          </a>
          <div className="hidden md:flex">
            <div className="flex items-end h-[75%] ml-5">
              <ul className="flex">
                {menuItems.map((menu, index) => (
                  <li
                    key={index}
                    className="relative inline-block ml-7 font-bold cursor-pointer transition-all duration-300 ease-out group"
                  >
                    {t(menu.title)}
                    <div className="dropdown hidden absolute bg-[url('../public/images/bg_menu_hover.png')] min-w-[220px] z-[999] p-1 border-[#828282] border-[4px] group-hover:block">
                      {menu.children.map((child, idx) => (
                        <a
                          key={idx}
                          className="block text-white py-3 px-4 hover:text-[#e71a0f]"
                          onClick={() =>
                            child.action === "#" ? null : navigate(child.action)
                          }
                        >
                          {t(child.title)}
                        </a>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="menu-kenhcine flex items-end h-[80px]">
              <a href="#">
                <img src="/images/kenhcine.gif" />
              </a>
            </div>
            <div className="menu-ticket cursor-pointer">
              <a onClick={() => navigate("/now-showing")}>
                <img src="/images/mua-ve_ngay.png" className="mt-14" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Size */}
      <div className="md:hidden">
        <div className="grid grid-cols-4 p-2 bg-gray-200 cursor-pointer">
          <div
            className="flex justify-center items-center relative"
            onClick={() => setIsNavbarOpen(!isNavbarOpen)}
          >
            <MenuOutlined className="text-xl" />
            <span className="absolute bottom-10 bg-black text-white text-xs rounded px-2 py-1 opacity-0 hover:opacity-100">
              {t("header.menu")}
            </span>
          </div>
          <div
            className="flex justify-center items-center relative"
            onClick={() => navigate("/account-info")}
          >
            <img src="/images/booking-ticket.png" className="h-6" />
            <span className="absolute bottom-10 bg-black text-white text-xs rounded px-2 py-1 opacity-0 hover:opacity-100">
              {t("header.my_tickets")}
            </span>
          </div>
          <div
            className="flex justify-center items-center relative"
            onClick={handleLoginLogoutClick}
          >
            <img src="/images/icon-login.png" className="h-6" />
            <span className="absolute bottom-10 bg-black text-white text-xs rounded px-2 py-1 opacity-0 hover:opacity-100">
              {user ? t("header.logout") : t("header.login_register")}
            </span>
          </div>
          <div
            className="flex justify-center items-center relative"
            onClick={() =>
              changeLanguage(
                i18n,
                activeLang === "vi" ? "en" : "vi",
                setActiveLang
              )
            }
          >
            <span
              className={`cursor-pointer ${
                activeLang === "vi" ? "text-red-600" : "text-gray-600"
              }`}
            >
              {activeLang.toUpperCase()}
            </span>
            <span className="absolute bottom-10 bg-black text-white text-xs rounded px-2 py-1 opacity-0 hover:opacity-100">
              {t("header.change_language")}
            </span>
          </div>
        </div>

        {isNavbarOpen && (
          <div className="bg-gray-100">
            {menuItems.map((menu, index) => (
              <div key={index}>
                <div
                  className={`p-4 cursor-pointer ${
                    activeMenu === menu.title ? "text-red-600" : ""
                  }`}
                  onClick={() => handleMenuClick(menu.title)}
                >
                  {t(menu.title)}
                </div>
                {activeMenu === menu.title && (
                  <div className="pl-4">
                    {menu.children.map((child, idx) => (
                      <div
                        key={idx}
                        className="py-2 cursor-pointer hover:text-red-600"
                        onClick={() =>
                          child.action === "#" ? null : navigate(child.action)
                        }
                      >
                        {t(child.title)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
