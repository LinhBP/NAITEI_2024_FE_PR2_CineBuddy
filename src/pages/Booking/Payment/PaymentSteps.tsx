// src/pages/Booking/Payment/PaymentSteps.tsx

import React from 'react';
import { UndoOutlined } from '@ant-design/icons';
import { Radio, RadioChangeEvent, Space } from 'antd';
import { useTranslation } from 'react-i18next';

interface PaymentStepsProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const PaymentSteps: React.FC<PaymentStepsProps> = ({ value, setValue }) => {
  const { t } = useTranslation();

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <div className='w-full lg:w-8/12'>
      {/* Step 1: Discount Information */}
      <div className='text-sm'>
        <div className='flex justify-between items-center bg-[#231d1c] text-white p-2'>
          <h4>
            {t('payment.step1')} <span>{t('payment.discount')}</span>
          </h4>
          <div className='flex items-center font-bold text-sm'>
            <UndoOutlined />
            <p className='ml-1'>{t('payment.reset')}</p>
          </div>
        </div>
        <p className='text-sm mt-2.5 mb-3.5'>
          {t('payment.voucher_notice')}
        </p>
        <p className='bg-[#fff1ce] px-4 py-1.5'>{t('payment.partner')}</p>
        <p className='bg-[#fff1ce] px-4 py-1.5 mt-1.5'>{t('payment.promo_code')}</p>
      </div>

      {/* Step 2: Payment Methods */}
      <div className='mt-5'>
        <div className='flex justify-between items-center bg-[#231d1c] text-white p-2'>
          <h4>
            {t('payment.step2')} <span>{t('payment.payment_method')}</span>
          </h4>
        </div>
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
  );
};

export default PaymentSteps;
