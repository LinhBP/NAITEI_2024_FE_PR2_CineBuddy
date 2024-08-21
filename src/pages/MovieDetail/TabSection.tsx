import React from 'react';
import { Movie } from '../../utils/api.ts';
import { useTranslation } from 'react-i18next';
import Trailer from '../../components/Trailer.tsx'; // Import the new Trailer component

interface TabSectionProps {
  movie: Movie;
  content: number;
  setContent: React.Dispatch<React.SetStateAction<number>>;
}

const TabSection: React.FC<TabSectionProps> = ({ movie, content, setContent }) => {
  const { t } = useTranslation();
  const movieKey = `movies.${movie.title.split('.')[1]}`;

  const detailTrailerTabs = [
    {
      text: t('details'),
      id: 0,
    },
    {
      text: t('trailer'),
      id: 1,
    },
  ];

  return (
    <div className="red-ribbon mb-10">
      <ul className="text-center mb-8">
        {detailTrailerTabs.map((tab) => (
          <li
            key={tab.id}
            className={`inline-block bg-[#e71a0f] h-[40px] leading-[40px] text-white cursor-pointer bg-no-repeat ${
              tab.id === 0
                ? "bg-[url('/public/images/ribon_left_menu.gif')] bg-left px-[10px] pl-[25px]"
                : "bg-[url('/public/images/ribon_right.gif')] bg-right px-[10px] pr-[25px]"
            }`}
            onClick={() => setContent(tab.id)}
          >
            {content === tab.id && (
              <img
                src="/images/ico_finger.png"
                alt={t('home.finger_icon_alt')}
                className="inline-block mr-[15px]"
              />
            )}
            {tab.text}
          </li>
        ))}
      </ul>

      {content === 0 ? (
        <p>{t(`${movieKey}.description`)}</p>
      ) : (
        <div className="flex justify-center">
          <Trailer
            src={`https://www.youtube.com/embed/${movie.trailer}`}
            width="560"
            height="315"
          />
        </div>
      )}
    </div>
  );
};

export default TabSection;
