/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import Error from '../../components/Error/Error';
import Loading from '../../components/Loading/Loading';
import { GET_CONTACT_DETAILS } from '../../utils/queries';

const ContactDetails = () => {
  const { contactId } = useParams();
  const { loading, error, data } = useQuery(GET_CONTACT_DETAILS, {
    variables: {
      id: contactId,
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <span>
      {`This is "${data.contact_by_pk.first_name} ${data.contact_by_pk.last_name}" contact details`}
    </span>
  );
};

export default ContactDetails;
