import React, { FC } from 'react';

import { ContactType } from '../../types/types';

interface ContactCardProps {
  contact: ContactType,
}

const ContactCard: FC<ContactCardProps> = ({ contact }) => (
  <span>{`${contact.first_name} ${contact.last_name}`}</span>
);

export default ContactCard;
