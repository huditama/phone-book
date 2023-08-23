/* eslint-disable no-alert */
/* eslint-disable react/no-array-index-key */
import React, {
  ChangeEvent, FC, FormEvent, useEffect, useState,
} from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header/Header';
import FormInput from '../../components/FormInput/FormInput';
import { Styles } from './Form.styles';
import { HeaderType } from '../../types/types';
import { ADD_CONTACT_WITH_PHONES } from '../../utils/queries';

interface Contact {
  first_name: string;
  last_name: string;
  phones: string[];
}

const Form: FC = () => {
  const [contact, setContact] = useState<Contact>({
    first_name: '',
    last_name: '',
    phones: [''],
  });
  const [isValid, setIsValid] = useState(false);
  const [addContact, { loading, error, data }] = useMutation(ADD_CONTACT_WITH_PHONES);
  const navigate = useNavigate();

  useEffect(() => {
    const isFormFilled = contact.first_name && contact.last_name && contact.phones.some((number) => number !== '');

    if (isFormFilled) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [contact]);

  useEffect(() => {
    if (error) {
      alert('Oops, something went wrong. Please try again!');
    }

    if (!loading && !error && data) {
      navigate(`/contact/${data.insert_contact.returning[0].id}`, { replace: true });
    }
  }, [loading, error, data]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handlePhoneInputChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const newPhoneNumber = event.target.value;
    const sanitizedPhoneNumber = newPhoneNumber.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    const newPhoneNumbers = [...contact.phones];
    newPhoneNumbers[index] = sanitizedPhoneNumber;

    setContact((prevContact) => ({
      ...prevContact,
      phones: newPhoneNumbers,
    }));
  };

  const handleAddPhoneNumber = () => {
    setContact((prevContact) => ({
      ...prevContact,
      phones: [...prevContact.phones, ''],
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Remove empty phone number entries
    const sanitizedPhoneNumbers = contact.phones
      .filter((phoneNumber) => phoneNumber.trim() !== '')
      .map((phoneNumber) => ({ number: phoneNumber }));

    const sanitizedContact = {
      ...contact,
      phones: sanitizedPhoneNumbers,
    };

    addContact({ variables: sanitizedContact });
  };

  return (
    <div>
      <Header
        type={HeaderType.Form}
        onClickRightButton={handleSubmit}
        disableRightButton={!isValid || loading}
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
              value={phoneNumber}
              onChange={(event) => handlePhoneInputChange(event, index)}
              type="tel"
              placeholder="Phone number"
            />
            <div className={Styles.spacer(8)} />
          </div>
        ))}
        <button onClick={handleAddPhoneNumber} className={Styles.addPhoneButton} type="button">
          <img
            src="/icons/add_grey_fill.png"
            alt="Add icon"
            className={Styles.addIcon}
          />
          <p style={{ color: 'white' }}>Add phone</p>
        </button>
      </div>
    </div>
  );
};

export default Form;
