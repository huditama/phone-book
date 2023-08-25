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
  const [page, setPage] = useState(1);

  const { loading, error, data } = useQuery(GET_CONTACT_LIST, {
    variables: {
      limit: 10, // Limit of 10 contacts per page
      offset: (page - 1) * 10, // Calculate the offset based on the current page
      order_by: {
        first_name: 'asc',
      },
      where: {
        _or: [
          { first_name: { _ilike: `%${searchKeyword}%` } },
          { last_name: { _ilike: `%${searchKeyword}%` } },
        ],
        id: {
          _nin: getFavoritesFromStorage().map((id: String) => Number(id)),
        }, // Exclude IDs that are in favorites
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const {
    loading: favoritesLoading,
    error: favoritesError,
    data: favoritesData,
  } = useQuery(GET_CONTACT_LIST, {
    variables: {
      order_by: {
        first_name: 'asc',
      },
      where: {
        id: {
          _in: getFavoritesFromStorage().map((id: String) => Number(id)),
        }, // Filter by Favorites IDs
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data?.contact) {
      const favoritesId = getFavoritesFromStorage();
      const filteredContacts = data.contact.filter(
        (contact: ContactType) => !favoritesId.includes(String(contact.id)),
      );

      setContacts(filteredContacts);
    }
  }, [data]);

  useEffect(() => {
    if (favoritesData?.contact) {
      setFavorites(favoritesData?.contact);
    }
  }, [favoritesData]);

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
    if (!data?.contact?.length) {
      return <span>No contacts!</span>;
    }

    const totalPages = Math.ceil(data.contact_aggregate.aggregate.count / 10);

    return (
      <>
        {renderHeader('Contacts')}
        {contacts.map((contact: ContactType, index: number) => (
          <ContactCard key={contact.id} index={index} contact={contact} />
        ))}
        <div className={Styles.pagination}>
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={Styles.paginationButton(page === 1)}
          >
            Previous
          </button>
          <span className={Styles.pageText}>{`${page} of ${totalPages}`}</span>
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={Styles.paginationButton(page === totalPages)}
          >
            Next
          </button>
        </div>
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

  const renderFinal = () => {
    if (loading || favoritesLoading) {
      return <Loading />;
    }

    if (error || favoritesError) {
      return <Error />;
    }

    return (
      <>
        {renderFavorites()}
        {renderContactList()}
      </>
    );
  };

  return (
    <div>
      <Header onChangeSearch={onChangeSearch} type={HeaderType.Home} />
      <div className={Styles.contentContainer}>
        {renderFinal()}
      </div>
    </div>
  );
};

export default App;
