/* eslint-disable react/no-array-index-key */
import React, {
  ChangeEvent, FC, FormEvent, useEffect, useState,
} from 'react';

import Header from '../../components/Header/Header';
import FormInput from '../../components/FormInput/FormInput';
import { Styles } from './Form.styles';
import { HeaderType } from '../../types/types';

interface Contact {
  firstName: string;
  lastName: string;
  phoneNumbers: string[];
}

const Form: FC = () => {
  const [contact, setContact] = useState<Contact>({
    firstName: '',
    lastName: '',
    phoneNumbers: [''],
  });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const isFormFilled = contact.firstName && contact.lastName && contact.phoneNumbers.some((number) => number !== '');

    if (isFormFilled) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [contact]);

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
    const newPhoneNumbers = [...contact.phoneNumbers];
    newPhoneNumbers[index] = sanitizedPhoneNumber;

    setContact((prevContact) => ({
      ...prevContact,
      phoneNumbers: newPhoneNumbers,
    }));
  };

  const handleAddPhoneNumber = () => {
    setContact((prevContact) => ({
      ...prevContact,
      phoneNumbers: [...prevContact.phoneNumbers, ''],
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Remove empty phone number entries
    const sanitizedPhoneNumbers = contact.phoneNumbers.filter((phoneNumber) => phoneNumber.trim() !== '');

    const sanitizedContact: Contact = {
      ...contact,
      phoneNumbers: sanitizedPhoneNumbers,
    };

    console.log('Contact:', sanitizedContact);
    // You can perform further actions with the sanitized contact data, like sending it to an API.
  };

  return (
    <div>
      <Header
        type={HeaderType.Form}
        onClickRightButton={handleSubmit}
        disableRightButton={!isValid}
      />
      <div className={Styles.container}>
        <FormInput
          name="firstName"
          value={contact.firstName}
          onChange={handleInputChange}
          placeholder="First name"
        />
        <div className={Styles.spacer(8)} />
        <FormInput
          name="lastName"
          value={contact.lastName}
          onChange={handleInputChange}
          placeholder="Last name"
        />
        <div className={Styles.spacer(32)} />
        {contact.phoneNumbers.map((phoneNumber, index) => (
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
