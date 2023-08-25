/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-alert */
/* eslint-disable react/no-array-index-key */
import React, {
  ChangeEvent, FC, FormEvent, useEffect, useState,
} from 'react';
import { useMutation } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from '../../components/Header/Header';
import FormInput from '../../components/FormInput/FormInput';
import { Styles } from './Form.styles';
import { HeaderType } from '../../types/types';
import { deepEqual, getExcessEntries } from '../../utils/helpers';
import {
  ADD_CONTACT_WITH_PHONES, ADD_NUMBER_TO_CONTACT, EDIT_CONTACT, EDIT_PHONE_NUMBER,
} from '../../utils/queries';

type Phones = {
  number: string
};

interface Contact {
  first_name: string;
  last_name: string;
  phones: Phones[];
}

const Form: FC = () => {
  const [contact, setContact] = useState<Contact>({
    first_name: '',
    last_name: '',
    phones: [{ number: '' }],
  });
  const [isValid, setIsValid] = useState(false);
  const [addContact, { loading, error, data }] = useMutation(ADD_CONTACT_WITH_PHONES);

  const [editPhone,
    {
      loading: loadingEditPhone, error: errorEditPhone, data: dataEditPhone,
    },
  ] = useMutation(EDIT_PHONE_NUMBER);

  const [editContact,
    {
      loading: loadingEditContact, error: errorEditContact, data: dataEditContact,
    },
  ] = useMutation(EDIT_CONTACT);

  const [
    addNumber,
    {
      loading: loadingAddNumber, error: errorAddNumber, data: dataAddNumber,
    },
  ] = useMutation(ADD_NUMBER_TO_CONTACT);

  const navigate = useNavigate();

  const location = useLocation();
  const contactFromLocation = location.state?.contact;

  useEffect(() => {
    const isFormFilled = contact.first_name && contact.last_name && contact.phones.some((phone) => phone.number !== '');

    if (isFormFilled) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [contact]);

  useEffect(() => {
    if (contactFromLocation) {
      const { first_name, last_name, phones } = contactFromLocation;
      const sanitizedPhones = phones.map((phone: Phones) => ({ number: phone.number }));

      setContact({
        first_name,
        last_name,
        phones: sanitizedPhones,
      });
    }
  }, [location]);

  const checkNamesEdited = () => {
    const firstNameChanged = contact.first_name !== contactFromLocation.first_name;
    const lastNameChanged = contact.last_name !== contactFromLocation.last_name;

    return firstNameChanged || lastNameChanged;
  };

  const checkPhonesEdited = () => {
    const { phones } = contactFromLocation;
    const phonesFromLocation = phones.map((phone: Phones) => ({ number: phone.number }));
    const arePhonesChanged = !deepEqual(contact.phones, phonesFromLocation);

    return arePhonesChanged;
  };

  const returnNewNumbers = () => {
    const { phones } = contactFromLocation;
    const phonesFromLocation = phones.map((phone: Phones) => ({ number: phone.number }));
    return getExcessEntries(phonesFromLocation, contact.phones);
  };

  const checkNewPhones = () => !!returnNewNumbers().length;

  useEffect(() => {
    if (error || errorEditPhone || errorEditContact || errorAddNumber) {
      alert('Oops, something went wrong. Please try again!');
    }

    if (!loading && !error && data) {
      const addDataId = data.insert_contact.returning[0].id;
      navigate(`/contact/${addDataId}`, { replace: true });
    }

    if (
      (!loadingEditPhone && !errorEditPhone && dataEditPhone)
      || (!loadingEditContact && !errorEditContact && dataEditContact)
      || (!loadingAddNumber && !errorAddNumber && dataAddNumber)
    ) {
      const editDataId = contactFromLocation.id;
      navigate(`/contact/${editDataId}`, { replace: true });
    }
  }, [
    loading,
    loadingEditPhone,
    loadingEditContact,
    loadingAddNumber,
    error,
    errorEditPhone,
    errorEditContact,
    errorAddNumber,
    data,
    dataEditPhone,
    dataEditContact,
    dataAddNumber,
  ]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Regular expression to match characters other than letters, numbers, and spaces
    const pattern = /[^a-zA-Z0-9\s]/g;

    const sanitizedValue = value.replace(pattern, ''); // Remove special characters

    setContact((prevContact) => ({
      ...prevContact,
      [name]: sanitizedValue,
    }));
  };

  const handlePhoneInputChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const newPhoneNumber = event.target.value;

    // Regular expression to match characters other than numbers, '+', '*', and '#'
    const pattern = /[^0-9+*#]/g;
    const sanitizedPhoneNumber = newPhoneNumber.replace(pattern, '');

    const newPhoneNumbers = [...contact.phones];
    newPhoneNumbers[index].number = sanitizedPhoneNumber;

    setContact((prevContact) => ({
      ...prevContact,
      phones: newPhoneNumbers,
    }));
  };

  const handleAddPhoneNumber = () => {
    setContact((prevContact) => ({
      ...prevContact,
      phones: [...prevContact.phones, { number: '' }],
    }));
  };

  const editPhoneNumbers = async () => {
    const { phones, id } = contactFromLocation;
    const phonesFromLocation = phones.map((phone: Phones) => ({ number: phone.number }));

    try {
      await Promise.all(
        phonesFromLocation.map(async (phone: Phones, index: number) => {
          const editedPhoneFromState = contact.phones[index];
          await editPhone({
            variables: {
              pk_columns: {
                number: phone.number,
                contact_id: id,
              },
              new_phone_number: !editedPhoneFromState ? '' : editedPhoneFromState.number,
            },
          });
        }),
      );
    } catch (err) {
      // Err
    }
  };

  const addPhoneNumbers = async () => {
    const { id } = contactFromLocation;
    const newNumbers = returnNewNumbers();

    try {
      await Promise.all(
        newNumbers.map(async (phone: Phones) => {
          await addNumber({
            variables: {
              contact_id: id,
              phone_number: phone.number,
            },
          });
        }),
      );
    } catch (err) {
      // err
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const hasEmptyNumber = contact.phones.some((phone) => phone.number === '');
    if (hasEmptyNumber) {
      alert('Please do not leave input empty!');
      return;
    }

    if (contactFromLocation) {
      const { first_name, last_name } = contact;

      if (checkPhonesEdited()) {
        editPhoneNumbers();
      }

      if (checkNewPhones()) {
        addPhoneNumbers();
      }

      if (checkNamesEdited()) {
        editContact({
          variables: {
            id: contactFromLocation.id,
            _set: {
              first_name,
              last_name,
            },
          },
        });
      }
    } else {
      addContact({ variables: contact });
    }
  };

  return (
    <div>
      <Header
        type={HeaderType.Form}
        onClickRightButton={handleSubmit}
        disableRightButton={
          !isValid
          || loading
          || loadingEditPhone
          || loadingEditContact
          || (contactFromLocation && !checkNamesEdited() && !checkPhonesEdited())
        }
      />
      <div className={Styles.container}>
        <FormInput
          name="first_name"
          value={contact.first_name}
          onChange={handleInputChange}
          placeholder="First name"
        />
        <div className={Styles.spacer(8)} />
        <FormInput
          name="last_name"
          value={contact.last_name}
          onChange={handleInputChange}
          placeholder="Last name"
        />
        <div className={Styles.spacer(32)} />
        {contact.phones.map((phoneNumber, index) => (
          <div key={index}>
            <FormInput
              value={phoneNumber.number}
              onChange={(event) => handlePhoneInputChange(event, index)}
              type="tel"
              placeholder="Phone number"
            />
            <div className={Styles.spacer(8)} />
          </div>
        ))}
        <button onClick={handleAddPhoneNumber} className={Styles.addPhoneButton} type="button">
          <p style={{ color: '#147EFB' }}>Add phone</p>
        </button>
      </div>
    </div>
  );
};

export default Form;
