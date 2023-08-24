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
import { deepEqual } from '../../utils/helpers';
import {
  ADD_CONTACT_WITH_PHONES, EDIT_CONTACT, EDIT_PHONE_NUMBER,
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
    const sanitizedPhonesFromState = contact.phones
      .filter((phoneNumber) => phoneNumber.number.trim() !== '');

    const arePhonesChanged = !deepEqual(sanitizedPhonesFromState, phonesFromLocation);

    return arePhonesChanged;
  };

  useEffect(() => {
    if (error || errorEditPhone || errorEditContact) {
      alert('Oops, something went wrong. Please try again!');
    }

    if (!loading && !error && data) {
      const addDataId = data.insert_contact.returning[0].id;
      navigate(`/contact/${addDataId}`, { replace: true });
    }

    if (
      (!loadingEditPhone && !errorEditPhone && dataEditPhone)
      || (!loadingEditContact && !errorEditContact && dataEditContact)
    ) {
      const editDataId = contactFromLocation.id;
      navigate(`/contact/${editDataId}`, { replace: true });
    }
  }, [
    loading,
    loadingEditPhone,
    loadingEditContact,
    error,
    errorEditPhone,
    errorEditContact,
    data,
    dataEditPhone,
    dataEditContact,
  ]);

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
    const sanitizedPhonesFromState = contact.phones
      .filter((phoneNumber) => phoneNumber.number.trim() !== '');
    const phonesFromLocation = phones.map((phone: Phones) => ({ number: phone.number }));

    try {
      await Promise.all(
        phonesFromLocation.map(async (phone: Phones, index: number) => {
          const editedPhoneFromState = sanitizedPhonesFromState[index];
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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Remove empty phone number entries
    const sanitizedPhoneNumbers = contact.phones
      .filter((phoneNumber) => phoneNumber.number.trim() !== '');

    const sanitizedContact = {
      ...contact,
      phones: sanitizedPhoneNumbers,
    };

    if (contactFromLocation) {
      const hasEmptyNumber = contact.phones.some((phone) => phone.number === '');
      const { first_name, last_name } = contact;

      if (hasEmptyNumber) {
        alert('Please do not leave input empty!');
        return;
      }

      if (checkPhonesEdited()) {
        editPhoneNumbers();
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
      addContact({ variables: sanitizedContact });
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
          || (!checkNamesEdited() && !checkPhonesEdited())
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
