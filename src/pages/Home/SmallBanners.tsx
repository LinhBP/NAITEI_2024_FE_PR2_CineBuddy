// src/pages/Home/SmallBanners.tsx

import React from "react";
import {
  LeftSmallBanner,
  RightSmallBanner,
} from "../../types/types.ts";
import { useTranslation } from "react-i18next";

interface SmallBannersProps {
  leftSmallBanners: LeftSmallBanner[];
  rightSmallBanners: RightSmallBanner[];
}

const SmallBanners: React.FC<SmallBannersProps> = ({
  leftSmallBanners,
  rightSmallBanners,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {leftSmallBanners.map((banner) => (
        <div
          key={banner.id}
          className={`fixed top-0 w-[120px] h-screen bg-transparent z-[1000] hidden md:block ${
            banner.id === 1 ? "left-0" : ""
          }`}
        >
          <img
            src={banner.image}
            alt={t("home.left_banner_alt", { id: banner.id })}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {rightSmallBanners.map((banner) => (
        <div
          key={banner.id}
          className={`fixed top-0 w-[120px] h-screen bg-transparent z-[1000] hidden md:block ${
            banner.id === 1 ? "right-0" : ""
          }`}
        >
          <img
            src={banner.image}
            alt={t("home.right_banner_alt", { id: banner.id })}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </>
  );
};

export default SmallBanners;
