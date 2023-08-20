import React, { FC } from 'react';

import { Styles } from './ContactCard.styles';
import { ContactType } from '../../types/types';

interface ContactCardProps {
  contact: ContactType,
  index: number,
}

const ContactCard: FC<ContactCardProps> = ({ contact, index }) => (
  <a href="/" className={Styles.contactCard(index)}>
    <span>{`${contact.first_name} ${contact.last_name}`}</span>
  </a>
);

export default ContactCard;
