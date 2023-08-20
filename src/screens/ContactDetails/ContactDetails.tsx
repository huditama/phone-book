/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import Error from '../../components/Error/Error';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import { Styles } from './ContactDetails.styles';
import { HeaderType } from '../../types/types';
import { GET_CONTACT_DETAILS } from '../../utils/queries';

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

    return (
      <span>
        {`This is "${data?.contact_by_pk.first_name} ${data?.contact_by_pk.last_name}" contact details`}
      </span>
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
