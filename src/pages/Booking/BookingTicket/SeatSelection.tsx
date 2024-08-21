import React from 'react';
import { useTranslation } from 'react-i18next';

interface SeatSelectionProps {
  seatStatus: { [key: string]: string };
  seatCondition: { [key: string]: string };
  handleSeatClick: (seat: string) => void;
  selectedSeats: string[];
  SEAT_PRICES: { [key: string]: number };  // Accept prices for tooltip
}

// Styles for different seat statuses and types
const seatStyles = {
  checked: 'bg-red-500 text-white',
  occupied: 'bg-gray-500 text-white cursor-not-allowed',
  unavailable: 'bg-gray-800 text-white cursor-not-allowed',
  standard: 'border-2 border-green-400 text-black',
  vip: 'border-2 border-red-400 text-black',
  sweetbox: 'bg-pink-400 text-white',
};

const SeatSelection: React.FC<SeatSelectionProps> = ({
  seatStatus,
  seatCondition,
  handleSeatClick,
  SEAT_PRICES
}) => {
  const { t } = useTranslation();

  const getSeatClass = (seat: string) => {
    if (!seatStatus || !seatCondition) return '';

    let baseClass = 'w-8 h-8 flex items-center justify-center cursor-pointer m-[2px]';
    const status = seatStatus[seat];
    const condition = seatCondition[seat];

    if (seatStyles[status]) {
      baseClass += ` ${seatStyles[status]}`;
    } else if (seatStyles[condition]) {
      baseClass += ` ${seatStyles[condition]}`;
    }

    return baseClass;
  };

  const getSeatPrice = (condition: string) => {
    return SEAT_PRICES[condition] || SEAT_PRICES['standard'];
  };

  const seatTypes = Object.entries(seatStyles).map(([type, className]) => ({
    type,
    label: t(`seats.${type}`),
    class: className,
  }));

  return (
    <div className="w-full mb-6 flex flex-col items-center">
      {/* Screen */}
      <div className="mb-4 w-full flex justify-center">
        <img src="/images/bg-screen.png" alt={t('seats.screen')} className="w-[700px]" />
      </div>

      {/* Seat Selection */}
      {Object.keys(seatStatus).length > 0 ? (
        <div style={{ maxWidth: `${8 * 40}px` }} className="grid grid-cols-8 gap-[2px] p-2">
          {Object.entries(seatStatus).map(([seat]) => {
            const price = getSeatPrice(seatCondition[seat]);
            return (
              <div
                key={seat}
                className={getSeatClass(seat)}
                onClick={() => handleSeatClick(seat)}
                title={`${t('seats.price')}: ${price}`}  // Tooltip showing the seat price
              >
                {seat}
              </div>
            );
          })}
        </div>
      ) : (
        <p>{t('seats.loading')}</p>
      )}

      {/* Seat Type Legend */}
      <div className="w-full max-w-2xl mt-6">
        <div className="flex flex-wrap items-center gap-2">
          {seatTypes.map((seatType) => (
            <div className="flex items-center ml-4" key={seatType.type}>
              <div className={`w-4 h-4 mr-1 ${seatType.class}`}></div> {seatType.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
