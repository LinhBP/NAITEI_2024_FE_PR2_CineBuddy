// src/components/TicketButton.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

interface TicketButtonProps {
  movieId: number;
  setModal: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const TicketButton: React.FC<TicketButtonProps> = ({ movieId, setModal }) => {
  const { t } = useTranslation(); // Initialize translation hook

  const handleBuyTicket = () => {
    console.log(`Buying tickets for movie ID: ${movieId}`);
    setModal(true); // Show the modal
  };

  return (
    <button
      className="bg-red-600 text-white text-sm font-bold px-1 py-2 rounded ml-4 w-[100px] hover:bg-red-900"
      onClick={handleBuyTicket}
    >
      {t('buy_ticket').toUpperCase()} {/* Translate button text */}
    </button>
  );
};

export default TicketButton;
