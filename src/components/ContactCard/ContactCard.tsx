import React, { FC } from 'react';

import { Link } from 'react-router-dom';
import { Styles } from './ContactCard.styles';
import { ContactType } from '../../types/types';

interface ContactCardProps {
  contact: ContactType,
  index: number,
}

const ContactCard: FC<ContactCardProps> = ({ contact, index }) => (
  <Link to={`/contact/${contact.id}`} className={Styles.contactCard(index)}>
    <span>{`${contact.first_name} ${contact.last_name}`}</span>
  </Link>
);

export default ContactCard;
