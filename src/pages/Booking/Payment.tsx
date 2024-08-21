// src/pages/Booking/Payment.tsx

import React, { useState, useEffect } from 'react';
import { UndoOutlined } from '@ant-design/icons';
import { Radio, RadioChangeEvent, Space } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateSeatStatus, fetchMovieDetails } from '../../utils/api.ts';
import { Movie } from '../../utils/api.ts';
import { getLoggedInUserFromSessionStorage, getLoggedInUserFromCookies } from '../../utils/UserLocalStorage.ts'; 
import { useTranslation } from 'react-i18next';

const StepTitle = ({ children }: { children: React.ReactNode }) => (
  <div className='flex justify-between items-center bg-[#231d1c] text-white p-2'>
    {children}
  </div>
);

const Payment: React.FC = () => {
  const [value, setValue] = useState<number>(1);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cinemaName, setCinemaName] = useState<string>('');
  const [showtime, setShowtime] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { selectedSeats, showtimeId, movieId, cinema, time, totalPrice, date } = location.state || {}; // Include date in destructuring

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails(movieId).then((data) => {
        if (data) {
          setMovie(data);
        } else {
          setMovie(null);
        }
      });
    }
    if (cinema) {
      setCinemaName(cinema);
    }
    if (time) {
      setShowtime(time);
    }
  }, [movieId, cinema, time]);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const handlePayment = async () => {
    if (selectedSeats && showtimeId) {
      try {
        await updateSeatStatus(showtimeId, selectedSeats);

        // Generate ticket data
        const ticket = {
          id: Date.now(),
          userEmail: getLoggedInUserFromSessionStorage()?.email || getLoggedInUserFromCookies()?.email,
          movieTitle: movie?.title,
          cinema: cinemaName,
          showtime: showtime,
          date, // Save the date in ticket data
          seats: selectedSeats,
          price: totalPrice,
          barcode: Math.random().toString(36).substr(2, 9).toUpperCase(),
          image: movie?.image,
        };

        const existingTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
        existingTickets.push(ticket);
        localStorage.setItem('tickets', JSON.stringify(existingTickets));

        alert(t('payment.success'));
        navigate('/account-info');
      } catch (error) {
        console.error('Error updating seat status:', error);
        alert(t('payment.failure'));
      }
    }
  };

  const movieTitleKey = movie ? `movies.${movie.title.split('.')[1]}.title` : '';

  return (
    <div className='bg-[#fdfcf0]'>
      <div className='max-w-screen-lg mx-auto py-[30px]'>
        <h1 className='bg-[#231d1c] text-white font-bold text-lg text-center p-1.5'>
          {t('payment.title')}
        </h1>

        <div className='flex flex-col lg:flex-row my-[30px] gap-5'>
          {/* Left Section: Payment Steps */}
          <div className='w-full lg:w-8/12'>
            {/* Step 1: Discount Information */}
            <div className='text-sm'>
              <StepTitle>
                <h4>
                  {t('payment.step1')} <span>{t('payment.discount')}</span>
                </h4>
                <div className='flex items-center font-bold text-sm'>
                  <UndoOutlined />
                  <p className='ml-1'>{t('payment.reset')}</p>
                </div>
              </StepTitle>
              <p className='text-sm mt-2.5 mb-3.5'>
                {t('payment.voucher_notice')}
              </p>
              <p className='bg-[#fff1ce] px-4 py-1.5'>{t('payment.partner')}</p>
              <p className='bg-[#fff1ce] px-4 py-1.5 mt-1.5'>{t('payment.promo_code')}</p>
            </div>

            {/* Step 2: Payment Methods */}
            <div className='mt-5'>
              <StepTitle>
                <h4>
                  {t('payment.step2')} <span>{t('payment.payment_method')}</span>
                </h4>
              </StepTitle>
              <div className='bg-[#fff1ce] mt-1.5 px-4'>
                <Radio.Group onChange={onChange} value={value}>
                  <Space direction='vertical'>
                    <Radio value={1} className='py-0.5'>
                      <div className='flex items-center'>
                        <img src='/images/atm_icon.png' alt='ATM Icon' className='w-10 mr-2' />
                        <span>{t('payment.atm_card')}</span>
                      </div>
                    </Radio>
                    <Radio value={2} className='py-0.5'>
                      <div className='flex items-center'>
                        <img src='/images/visa-mastercard-icon.png' alt='Visa/Mastercard Icon' className='w-10 mr-2' />
                        <span>{t('payment.international_card')}</span>
                      </div>
                    </Radio>
                    <Radio value={3} className='py-0.5'>
                      <div className='flex items-center'>
                        <img src='/images/momo_icon.png' alt='MoMo Icon' className='w-10 mr-2' />
                        <span>{t('payment.momo')}</span>
                      </div>
                    </Radio>
                    <Radio value={4} className='py-0.5'>
                      <div className='flex items-center'>
                        <img src='/images/icon-HOT-96x96.png' alt='ZaloPay Icon' className='w-10 mr-2' />
                        <span>{t('payment.zalopay')}</span>
                      </div>
                    </Radio>
                    <Radio value={5} className='py-0.5'>
                      <div className='flex items-center'>
                        <img src='/images/shopeepay96x96.png' alt='ShopeePay Icon' className='w-10 mr-2' />
                        <span>{t('payment.shopeepay')}</span>
                      </div>
                    </Radio>
                  </Space>
                </Radio.Group>
              </div>
            </div>
          </div>

          {/* Right Section: Subtotal and Booking Summary */}
          <div className='w-full lg:w-4/12 mt-5 lg:mt-0'>
            <div className='bg-white p-4 shadow-lg'>
              <h2 className='font-bold text-lg mb-2'>{t('payment.summary')}</h2>
              <p>{t('payment.movie')}: {t(movieTitleKey)}</p>
              <p>{t('payment.showtime')}: {showtime}</p>
              <p>{t('payment.date')}: {date}</p> {/* Display date */}
              <p>{t('payment.cinema')}: {cinemaName}</p>
              <p>{t('payment.seats')}: {selectedSeats.join(', ')}</p>
              <div className='flex justify-between font-bold mt-2'>
                <span>{t('payment.total')}:</span>
                <span>{totalPrice?.toLocaleString()}₫</span>
              </div>
              <button 
                className='bg-[#231d1c] text-white py-2 px-4 mt-4 w-full'
                onClick={handlePayment}
              >
                {t('payment.pay_button')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
