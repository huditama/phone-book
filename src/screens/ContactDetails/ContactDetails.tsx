/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';

import Error from '../../components/Error/Error';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import PhoneCard from '../../components/PhoneCard/PhoneCard';
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog';
import { Styles } from './ContactDetails.styles';
import { Constants } from '../../utils/constants';
import { HeaderType } from '../../types/types';
import { DELETE_CONTACT, GET_CONTACT_DETAILS } from '../../utils/queries';
import { getFavoritesFromStorage } from '../../utils/helpers';

interface PhoneInterface {
  number: string
}

const ContactDetails = () => {
  const { contactId } = useParams();

  const {
    loading: loadingDetails, error: errorDetails, data: dataDetails,
  } = useQuery(GET_CONTACT_DETAILS, {
    variables: {
      id: contactId,
    },
    fetchPolicy: 'cache-and-network',
  });

  const [
    deleteContact,
    { loading: loadingDelete, error: errorDelete, data: dataDelete },
  ] = useMutation(DELETE_CONTACT);

  const navigate = useNavigate();

  const [showDialog, setShowDialog] = useState(false);

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const isContactFavorite = () => getFavoritesFromStorage().includes(contactId);

  const [contactFavorited, setContactFavorited] = useState(isContactFavorite());

  useEffect(() => {
    if (errorDelete) {
      alert('Oops, something went wrong. Please try again!');
    }

    if (!loadingDelete && !errorDelete && dataDelete) {
      handleCloseDialog();
      navigate('/', { replace: true });
    }
  }, [loadingDelete, errorDelete, dataDelete]);

  const onClickEdit = () => {
    navigate('/form', {
      state: {
        contact: dataDetails?.contact_by_pk,
      },
    });
  };

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleConfirmDelete = () => {
    deleteContact({
      variables: {
        id: contactId,
      },
    });
  };

  const renderDeleteConfirmation = () => (
    <>
      <button onClick={handleOpenDialog} className={Styles.ctaButton} type="button">
        <p style={{ color: '#FC3D39' }}>Delete contact</p>
      </button>
      <ConfirmationDialog
        message="Are you sure you want to perform this action?"
        isOpen={showDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </>
  );

  const addToFavorites = () => {
    const favorites = getFavoritesFromStorage();

    favorites.push(contactId);
    localStorage.setItem(Constants.LocalStorage.Favorites, JSON.stringify(favorites));
    setContactFavorited(true);
  };

  const deleteFromFavorites = () => {
    const favorites = getFavoritesFromStorage();
    const filteredFavorites = favorites.filter((id: string) => id !== contactId);

    localStorage.setItem(Constants.LocalStorage.Favorites, JSON.stringify(filteredFavorites));
    setContactFavorited(false);
  };

  const renderFavoritesButton = () => (
    <button
      onClick={contactFavorited ? deleteFromFavorites : addToFavorites}
      className={Styles.ctaButton}
      type="button"
    >
      <p style={{ color: '#147EFB' }}>
        {`${contactFavorited ? 'Delete from favorites' : 'Add to favorites'}`}
      </p>
    </button>
  );

  const renderContactDetails = () => {
    if (loadingDetails) {
      return <Loading />;
    }

    if (errorDetails || !dataDetails?.contact_by_pk) {
      return <Error />;
    }

    const { first_name, last_name, phones } = dataDetails.contact_by_pk;
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
        {renderFavoritesButton()}
        {renderDeleteConfirmation()}
      </>
    );
  };

  return (
    <>
      <Header
        onClickRightButton={onClickEdit}
        disableRightButton={loadingDetails || loadingDelete || !dataDetails?.contact_by_pk}
        type={HeaderType.Details}
      />
      <div className={Styles.layout}>
        {renderContactDetails()}
      </div>
    </>
  );
};

export default ContactDetails;
