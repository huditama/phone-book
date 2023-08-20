/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import Error from '../../components/Error/Error';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import PhoneCard from '../../components/PhoneCard/PhoneCard';
import { Styles } from './ContactDetails.styles';
import { HeaderType } from '../../types/types';
import { GET_CONTACT_DETAILS } from '../../utils/queries';

interface PhoneInterface {
  number: string
}

const ContactDetails = () => {
  const { contactId } = useParams();
  const { loading, error, data } = useQuery(GET_CONTACT_DETAILS, {
    variables: {
      id: contactId,
    },
  });

  const renderContactDetails = () => {
    if (loading) {
      return <Loading />;
    }

    if (error || !data?.contact_by_pk) {
      return <Error />;
    }

    const { first_name, last_name, phones } = data.contact_by_pk;
    const initials = first_name.charAt(0).toUpperCase()
      + last_name.charAt(0).toUpperCase();
    return (
      <>
        <div className={Styles.contactImageContainer}>
          <div className={Styles.contactImage}>
            <h1>{initials}</h1>
          </div>
          <span className={Styles.contactName}>{`${first_name} ${last_name}`}</span>
        </div>
        {
          phones.map((phone: PhoneInterface, index: number) => (
            <PhoneCard
              index={index}
              key={phone.number}
              phone={phone.number}
            />
          ))
        }
      </>
    );
  };

  return (
    <>
      <Header type={HeaderType.Details} />
      <div className={Styles.layout}>
        {renderContactDetails()}
      </div>
    </>
  );
};

export default ContactDetails;
