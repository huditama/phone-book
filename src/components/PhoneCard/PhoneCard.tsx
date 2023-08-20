import React, { FC } from 'react';

import { Styles } from './PhoneCard.styles';

interface PhoneCardProps {
  phone: string,
  index: number,
}

const PhoneCard: FC<PhoneCardProps> = ({ phone, index }) => (
  <div className={Styles.container(index)}>
    {phone}
    <div className={Styles.ctaContainer}>
      <a href={`sms:${phone}`} className={Styles.ctaButton}>
        <img
          src="/icons/text.png"
          alt="Text icon"
          className={Styles.ctaIcon}
        />
      </a>
      <div className={Styles.ctaSpacer} />
      <a href={`tel:${phone}`} className={Styles.ctaButton}>
        <img
          src="/icons/call.png"
          alt="Call icon"
          className={Styles.ctaIcon}
        />
      </a>
    </div>
  </div>
);

export default PhoneCard;
