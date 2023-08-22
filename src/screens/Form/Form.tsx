import React, { useState } from 'react';

import Header from '../../components/Header/Header';
import FormInput from '../../components/FormInput/FormInput';
import { Styles } from './Form.styles';
import { HeaderType } from '../../types/types';

interface Phone {
  id: number;
  number: string;
}

const Form = () => {
  const [phoneNumbers, setPhoneNumbers] = useState<Phone[]>([{ id: 0, number: '' }]);
  const [phoneIdCounter, setPhoneIdCounter] = useState(1);

  const handleAddPhoneNumber = () => {
    setPhoneNumbers((prevPhoneNumbers) => [
      ...prevPhoneNumbers,
      { id: phoneIdCounter, number: '' },
    ]);
    setPhoneIdCounter(phoneIdCounter + 1);
  };

  return (
    <div>
      <Header type={HeaderType.Form} />
      <div className={Styles.container}>
        <FormInput placeholder="First name" />
        <div className={Styles.spacer(8)} />
        <FormInput placeholder="Last name" />
        <div className={Styles.spacer(32)} />
        {
          phoneNumbers.map((phone) => (
            <div key={phone.id}>
              <FormInput type="tel" placeholder="Phone number" />
              <div className={Styles.spacer(8)} />
            </div>

          ))
        }
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
