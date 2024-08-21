// src/pages/Home/GifBanner.tsx

import React from "react";
import { GifBanner as GifBannerType } from "../../types/types.ts";
import { useTranslation } from "react-i18next";

interface GifBannerProps {
  showGif: boolean;
  gifBanner: GifBannerType | null;
  setShowGif: (show: boolean) => void;
}

const GifBanner: React.FC<GifBannerProps> = ({
  showGif,
  gifBanner,
  setShowGif,
}) => {
  const { t } = useTranslation();

  return (
    <>
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
    </>
  );
};

export default GifBanner;
