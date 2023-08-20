import React from 'react';
import { useQuery } from '@apollo/client';

import { Styles } from './App.styles';
import { ContactType } from '../types/types';
import { GET_CONTACT_LIST } from '../utils/queries';
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
      <Header />
      <div className={Styles.contentContainer}>
        {renderContactList()}
      </div>
    </div>
  );
};

export default App;
