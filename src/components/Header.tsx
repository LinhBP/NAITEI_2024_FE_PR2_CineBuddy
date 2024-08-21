import { MenuOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [activeLang, setActiveLang] = useState(i18n.language); 
    const accessToken = false; // Mocked
    const user = { hoTen: "User" }; // Mocked

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setActiveLang(lng); 
    };

    const hambugerMenu = [
        {
            key: "menu",
            label: t('menu'),
            icon: <MenuOutlined />,
            children: [
                {
                    key: "/now-showing",
                    label: t('now_showing'),
                },
                {
                    key: "/coming-soon",
                    label: t('coming_soon'),
                },
            ],
        },
        {
            key: "ticket",
            icon: (
                <img
                    src="https://cgv-booking-demo.vercel.app/image/icon_ticket25.png"
                />
            ),
        },
    ];

    return (
        <HeaderContainer>
            <div>
                <div className="menu-top justify-end gap-7 max-w-screen-lg mt-3 container flex">
                    <div className="top-content hidden sm:flex gap-7">
                        <div
                            className="flex gap-2 items-center cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            <img src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/icon_promotion25.png" />
                            <span>{t('new_and_promotion')}</span>
                        </div>
                        <div
                            className="flex gap-2 items-center cursor-pointer"
                            onClick={() => {
                                if (accessToken) {
                                    navigate("/account-info");
                                } else {
                                    navigate("/login");
                                }
                            }}
                        >
                            <img src="https://cgv-booking-demo.vercel.app/image/icon_ticket25.png" />
                            <span>{t('my_tickets')}</span>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <img src="https://cgv-booking-demo.vercel.app/image/icon_login25.png" />
                        {!accessToken ? (
                            <span
                                onClick={() => navigate("/login")}
                                className="cursor-pointer"
                            >
                                {t('login_register')}
                            </span>
                        ) : (
                            <span>
                                <span
                                    onClick={() => navigate("/account-info")}
                                    className="cursor-pointer"
                                >
                                    {`${t('hello')}, ${user?.hoTen?.toUpperCase()}! `}
                                </span>
                                <span
                                    onClick={() => navigate("/")}
                                    className="cursor-pointer hover:underline"
                                >
                                    {t('logout')}
                                </span>
                            </span>
                        )}
                    </div>
                    <div className="flex items-center">
                        <span
                            className={`cursor-pointer px-2 py-0.5 rounded-s-xl ${
                                activeLang === "vi" ? "bg-red-600 text-white" : "bg-gray-500 text-white"
                            }`}
                            onClick={() => changeLanguage('vi')}
                        >
                            VN
                        </span>
                        <span
                            className={`cursor-pointer px-2 py-0.5 rounded-e-xl ${
                                activeLang === "en" ? "bg-red-600 text-white" : "bg-gray-500 text-white"
                            }`}
                            onClick={() => changeLanguage('en')}
                        >
                            EN
                        </span>
                    </div>
                </div>
                <div className="header-menu">
                    <div className="container h-full flex justify-center">
                        <a
                            onClick={() => navigate("/")}
                            className="logo h-full flex items-center cursor-pointer"
                        >
                            <img
                                src="https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png"
                            />
                        </a>
                        <div className="hidden md:flex">
                            <div className="menu-list">
                                <ul>
                                    <li className="movie-list">
                                        {t('movies')}
                                        <div className="dropdown">
                                            <a
                                                onClick={() =>
                                                    navigate("/now-showing")
                                                }
                                            >
                                                {t('now_showing')}
                                            </a>
                                            <a
                                                onClick={() =>
                                                    navigate("/coming-soon")
                                                }
                                            >
                                                {t('coming_soon')}
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        {t('cinemas')}
                                        <div className="dropdown">
                                            <a
                                                onClick={() =>
                                                    navigate("/cinemas")
                                                }
                                            >
                                                {t('all_cinemas')}
                                            </a>
                                            <a href="#">{t('special_cinemas')}</a>
                                            <a href="#">{t('3d_cinemas')}</a>
                                        </div>
                                    </li>
                                    <li>
                                        {t('members')}
                                        <div className="dropdown">
                                            <a
                                                onClick={() => {
                                                    if (accessToken) {
                                                        navigate(
                                                            "/account-info"
                                                        );
                                                    } else {
                                                        navigate("/login");
                                                    }
                                                }}
                                            >
                                                {t('cgv_account')}
                                            </a>
                                            <a href="#">{t('benefits')}</a>
                                        </div>
                                    </li>
                                    <li>
                                        {t('cultureplex')}
                                        <div className="dropdown">
                                            <a href="#">{t('online_store')}</a>
                                            <a href="#">{t('rent_and_group')}</a>
                                            <a href="#">{t('e_cgv')}</a>
                                            <a href="#">{t('egift')}</a>
                                            <a href="#">{t('cgv_rules')}</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="menu-kenhcine flex items-end h-[80px]">
                                <a href="#">
                                    <img
                                        src="https://www.cgv.vn/media/wysiwyg/2019/AUG/kenhcine.gif"
                                    />
                                </a>
                            </div>
                            <div className="menu-ticket cursor-pointer">
                                <a onClick={() => navigate("/now-showing")}>
                                    <img
                                        src="https://www.cgv.vn/media/wysiwyg/news-offers/mua-ve_ngay.png"
                                        className="mt-14"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className="hamburger-menu md:hidden">
                    <div
                        className="w-full"
                        onClick={({ key }) => navigate(key)}
                    >
                        {hambugerMenu.map((menuItem) => (
                            <div key={menuItem.key}>
                                <div className="flex justify-between items-center p-2 bg-gray-200">
                                    <span>{menuItem.label}</span>
                                    {menuItem.icon}
                                </div>
                                {menuItem.children && (
                                    <div className="pl-4">
                                        {menuItem.children.map((child) => (
                                            <div
                                                key={child.key}
                                                className="p-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() =>
                                                    navigate(child.key)
                                                }
                                            >
                                                {child.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
    .header-menu {
        background: url(https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bg-top.png);
        width: 100%;
        height: 135px;
        margin-top: 12px;
        background-size: contain;

        .logo:hover {
            opacity: 0.8;
        }
    }

    .menu-list {
        align-items: end;
        display: flex;
        height: 75%;
        margin-left: 20px;

        li {
            display: inline-block;
            margin-left: 30px;
            font-weight: bold;
            position: relative;
            cursor: pointer;
            transition: all 0.3s ease-out;

            img {
                display: inline-block;
            }

            .dropdown {
                display: none;
                position: absolute;
                background: url(https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bg_menu_hover.png);
                min-width: 220px;
                z-index: 999;
                padding: 3px;
                border: solid #828282 4px;
            }

            &:hover .dropdown {
                display: block;
            }

            a {
                color: white;
                padding: 12px 16px;
                text-decoration: none;
                display: block;
            }

            a:hover {
                color: #E71A0F;
            }
        }
    }

    //Responsive
    @media screen and (max-width: 768px) {
        .menu-top {
            gap: 0px;

            a {
                font-size: 12px;
                gap: 20px;
            }
        }

        .hamburger-menu {
            ul {
                background-color: var(--bg-color);
            }

            li {
                width: 50%;
                text-align: center;
                color: #898987;

                .ant-menu-submenu-title {
                    display: flex;
                    justify-content: center;
                }

                svg {
                    width: 30px;
                    height: 30px;
                }
            }
        }
    }
`;

export default Header;
