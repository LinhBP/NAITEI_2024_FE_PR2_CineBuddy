// src/components/TicketButton.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';

interface TicketButtonProps {
  movieId: number;
  setModal: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const TicketButton: React.FC<TicketButtonProps> = ({ setModal }) => {
  const { t } = useTranslation(); 

  const handleBuyTicket = () => {
    setModal(true); // Show the modal
  };

  return (
    <button
      className="bg-red-600 text-white text-sm font-bold px-1 py-2 rounded ml-4 w-[100px] hover:bg-red-900"
      onClick={handleBuyTicket}
    >
      {t('buy_ticket').toUpperCase()} 
    </button>
  );
};

export default TicketButton;