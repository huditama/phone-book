import React, { ChangeEvent, FC, HTMLInputTypeAttribute } from 'react';

import { Styles } from './FormInput.styles';

interface FormInputProps {
  placeholder: string,
  type?: HTMLInputTypeAttribute,
  value?: string,
  name?: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const FormInput: FC<FormInputProps> = ({
  placeholder, type, value, onChange, name,
}) => (
  <div className={Styles.container}>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={Styles.input}
    />
  </div>
);

FormInput.defaultProps = {
  type: 'text',
  value: '',
  name: '',
};

export default FormInput;
