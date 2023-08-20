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
      <button className={Styles.ctaButton} type="button">
        <img
          src="/icons/text.png"
          alt="Text icon"
          className={Styles.ctaIcon}
        />
      </button>
      <div className={Styles.ctaSpacer} />
      <button className={Styles.ctaButton} type="button">
        <img
          src="/icons/call.png"
          alt="Call icon"
          className={Styles.ctaIcon}
        />
      </button>
    </div>
  </div>
);

export default PhoneCard;
