import React from 'react';
import { useQuery } from '@apollo/client';

import Styles from './App.styles';
import Header from '../components/Header/Header';
import ContactCard from '../components/ContactCard/ContactCard';
import { ContactType } from '../types/types';
import { GET_CONTACT_LIST } from '../utils/queries';

const App = () => {
  const { loading, error, data } = useQuery(GET_CONTACT_LIST);

  const renderContactList = () => {
    if (loading) {
      return <span>Loading...</span>;
    }

    if (error) {
      return <span>Oops, something went wrong. Please try again!</span>;
    }

    if (!data?.contact?.length) {
      return <span>No contacts!</span>;
    }

    return data.contact.map((contact: ContactType) => (
      <ContactCard key={contact.id} contact={contact} />
    ));
  };

  return (
    <div className={Styles.mainLayout}>
      <Header />
      <div className={Styles.contentContainer}>
        {renderContactList()}
      </div>
    </div>
  );
};

export default App;
