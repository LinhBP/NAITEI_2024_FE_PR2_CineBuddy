import React from 'react';

interface CinemaSelectionProps {
  cities: string[];
  selectedCity: string | null;
  handleCityClick: (city: string) => void;
  cinemas: string[];
  selectedCinema: string | null;
  handleCinemaClick: (cinema: string) => void;
}

const CinemaSelection: React.FC<CinemaSelectionProps> = ({
  cities,
  selectedCity,
  handleCityClick,
  cinemas,
  selectedCinema,
  handleCinemaClick,
}) => {
  return (
    <div>
      <div className="w-full">
        <div className="bg-[url('/public/images/cinema-showtimes-favorite-top.png')] w-full md:block hidden h-[45px] bg-center bg-cover"></div>

        <div className="bg-[url('/public/images/cinema-showtimes-favorite-center.png')] w-full bg-repeat-y bg-center bg-contain">
          <div className="px-4 py-6">
            <div className="text-center mb-4">
              <h1 className="text-[#717171] text-3xl sm:text-4xl lg:text-5xl font-bold custom-text-shadow">
                CGV CINEMAS
              </h1>
            </div>

            <div className="border-b-[3px] border-gray-300 mx-4 sm:mx-10 my-10 opacity-30"></div>

            <div className="mb-6">
              <ul className="flex flex-wrap justify-center gap-4">
                {cities.map((city) => (
                  <li key={city}>
                    <span
                      onClick={() => handleCityClick(city)}
                      className={`cursor-pointer ${
                        selectedCity === city ? 'text-red-600' : 'text-white'
                      }`}
                    >
                      {city}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-b-[3px] border-gray-300 mx-4 sm:mx-10 my-10 opacity-30"></div>

            {selectedCity && (
              <div className="mb-4">
                <ul className="flex flex-wrap justify-center gap-4">
                  {cinemas.map((cinema) => (
                    <li key={cinema}>
                      <span
                        onClick={() => handleCinemaClick(cinema)}
                        className={`cursor-pointer px-2 py-1 sm:px-4 sm:py-2 rounded ${
                          selectedCinema === cinema
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-800 text-white'
                        }`}
                      >
                        {cinema}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="bg-[url('/public/images/cinema-showtimes-favorite-bottom.png')] w-full md:block hidden h-[45px] bg-center bg-cover"></div>
      </div>
    </div>
  );
};

export default CinemaSelection;
