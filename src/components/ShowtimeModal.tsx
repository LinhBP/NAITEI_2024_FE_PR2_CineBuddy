// src/components/ShowtimeModal.tsx
import React from 'react';

interface ShowtimeModalProps {
  modal: boolean | null;
  setModal: React.Dispatch<React.SetStateAction<boolean | null>>;
  movieId: number;
}

const ShowtimeModal: React.FC<ShowtimeModalProps> = ({ modal, setModal, movieId }) => {
  if (!modal) return null;

  return (
    <div className="modal">
      {/* Modal Content */}
      <div className="modal-content">
        <h2>Available Showtimes for Movie {movieId}</h2>
        {/* Render available showtimes here */}
        <button onClick={() => setModal(null)}>Close</button>
      </div>
    </div>
  );
};

export default ShowtimeModal;
