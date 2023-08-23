import React from 'react';
import { useQuery } from '@apollo/client';

import { Styles } from './App.styles';
import { GET_CONTACT_LIST } from '../utils/queries';
import { ContactType, HeaderType } from '../types/types';
import Error from '../components/Error/Error';
import Header from '../components/Header/Header';
import Loading from '../components/Loading/Loading';
import ContactCard from '../components/ContactCard/ContactCard';

const App = () => {
  const { loading, error, data } = useQuery(GET_CONTACT_LIST, {
    variables: {
      order_by: {
        first_name: 'asc',
      },
    },
    // I'm still confused on which policies to use :(
    fetchPolicy: 'cache-and-network',
  });

  const renderContactList = () => {
    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <Error />;
    }

    if (!data?.contact?.length) {
      return <span>No contacts!</span>;
    }

    return data.contact.map((contact: ContactType, index: number) => (
      <ContactCard key={contact.id} index={index} contact={contact} />
    ));
  };

  return (
    <div>
      <Header type={HeaderType.Home} />
      <div className={Styles.contentContainer}>
        {renderContactList()}
      </div>
    </div>
  );
};

export default App;
