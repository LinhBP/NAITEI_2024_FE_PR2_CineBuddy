// src/pages/Home/PopupBanner.tsx

import React from 'react';
import { PopupBanner as PopupBannerType } from '../../types/types.ts';
import { useTranslation } from "react-i18next";

interface PopupBannerProps {
  showPopup: boolean;
  popupBanner: PopupBannerType | null;
  setShowPopup: (show: boolean) => void;
}

const PopupBanner: React.FC<PopupBannerProps> = ({ showPopup, popupBanner, setShowPopup }) => {
  const { t } = useTranslation();
  
  return (
    <>
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
    </>
  );
};

export default PopupBanner;
