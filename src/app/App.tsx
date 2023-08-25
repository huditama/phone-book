import React, { ChangeEvent, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { Styles } from './App.styles';
import { GET_CONTACT_LIST } from '../utils/queries';
import { ContactType, HeaderType } from '../types/types';
import { getFavoritesFromStorage } from '../utils/helpers';
import Error from '../components/Error/Error';
import Header from '../components/Header/Header';
import Loading from '../components/Loading/Loading';
import ContactCard from '../components/ContactCard/ContactCard';

const App = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [contacts, setContacts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { loading, error, data } = useQuery(GET_CONTACT_LIST, {
    variables: {
      order_by: {
        first_name: 'asc',
      },
      where: {
        _or: [
          { first_name: { _ilike: `%${searchKeyword}%` } },
          { last_name: { _ilike: `%${searchKeyword}%` } },
        ],
      },
    },
    // I'm still confused on which policies to use :(
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data?.contact) {
      const favoritesId = getFavoritesFromStorage();

      const filteredFavorites = data.contact.filter(
        (contact: ContactType) => favoritesId.includes(String(contact.id)),
      );

      const filteredContacts = data.contact.filter(
        (contact: ContactType) => !favoritesId.includes(String(contact.id)),
      );

      setContacts(filteredContacts);
      setFavorites(filteredFavorites);
    }
  }, [data]);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchKeyword(value);
  };

  const renderHeader = (title: string) => (
    <div className={Styles.header}>
      <p>{title}</p>
    </div>
  );

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

    return (
      <>
        {renderHeader('Contacts')}
        {contacts.map((contact: ContactType, index: number) => (
          <ContactCard key={contact.id} index={index} contact={contact} />
        ))}
      </>
    );
  };

  const renderFavorites = () => {
    if (favorites.length) {
      return (
        <>
          {renderHeader('Favorites')}
          {favorites.map((contact: ContactType, index: number) => (
            <ContactCard key={contact.id} index={index} contact={contact} />
          ))}
          <div className={Styles.spacer} />
        </>
      );
    }

    return null;
  };

  return (
    <div>
      <Header onChangeSearch={onChangeSearch} type={HeaderType.Home} />
      <div className={Styles.contentContainer}>
        {renderFavorites()}
        {renderContactList()}
      </div>
    </div>
  );
};

export default App;
