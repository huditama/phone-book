import React from 'react';
import { useQuery } from '@apollo/client';

import Header from '../components/Header/Header';
import { Styles } from './App.styles';
import { ContactType } from '../types/types';
import { GET_CONTACT_LIST } from '../utils/queries';
import ContactCard from '../components/ContactCard/ContactCard';

function App() {
  const { loading, error, data } = useQuery(GET_CONTACT_LIST);

  const renderContactList = () => {
    if (loading) {
      return <span>Loading...</span>;
    }

    if (error) {
      return <span>Oops, something went wrong. Please try again!</span>
    }

    if (!data?.contact?.length) {
      return <span>No contacts!</span>;
    }

    return data.contact.map((contact: ContactType, index: number) => {
      return (
        <ContactCard key={index} contact={contact} />
      );
    })
  };

  return (
    <div className={Styles.mainLayout}>
      <Header />
      <div className={Styles.contentContainer}>
        {renderContactList()}
      </div>
    </div>
  );
}

export default App;
