import React, { useEffect, useState } from 'react';
import { getLoggedInUserFromSessionStorage, getLoggedInUserFromCookies, fetchUserTickets, Ticket } from '../../utils/UserLocalStorage.ts';
import Barcode from 'react-barcode';
import { useTranslation } from 'react-i18next';

const AccountInfo: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const user = getLoggedInUserFromSessionStorage() || getLoggedInUserFromCookies();
    if (user) {
      fetchUserTickets(user)
        .then((fetchedTickets: Ticket[]) => setTickets(fetchedTickets))
        .catch(console.error);
    }
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{t('accountInfo.title')}</h1>
      {tickets.length > 0 ? (
        tickets.map(ticket => {
          const movieTitleKey = ticket.movieTitle ? `movies.${ticket.movieTitle.split('.')[1]}.title` : '';
          return (
            <div key={ticket.id} className="border p-4 mb-4 shadow-md flex flex-col lg:flex-row items-center">
              <div className="flex flex-col lg:flex-row items-center lg:items-start lg:w-2/3">
                <img src={ticket.image} alt={t(movieTitleKey)} className="w-24 h-32 object-cover mr-4 mb-4 lg:mb-0" />
                <div>
                  <h2 className="text-xl font-bold">{t(movieTitleKey)}</h2>
                  <p>{t('accountInfo.cinema')}: {ticket.cinema}</p>
                  <p>{t('accountInfo.showtime')}: {ticket.showtime}</p>
                  <p>{t('accountInfo.date')}: {ticket.date}</p> {/* Display date */}
                  <p>{t('accountInfo.seats')}: {ticket.seats.join(', ')}</p>
                  <p>{t('accountInfo.price')}: {ticket.price.toLocaleString()}₫</p>
                </div>
              </div>
              <div className="flex justify-center lg:justify-start lg:w-1/3 mt-4 lg:mt-0">
                <Barcode value={ticket.barcode} />
              </div>
            </div>
          );
        })
      ) : (
        <p>{t('accountInfo.no_tickets')}</p>
      )}
    </div>
  );
};

export default AccountInfo;
