import React, { FC, HTMLInputTypeAttribute } from 'react';

import { Styles } from './FormInput.styles';

interface FormInputProps {
  placeholder: string,
  type?: HTMLInputTypeAttribute,
}

const FormInput: FC<FormInputProps> = ({
  placeholder, type,
}) => (
  <div className={Styles.container}>
    <input
      type={type}
      placeholder={placeholder}
      className={Styles.input}
    />
  </div>
);

FormInput.defaultProps = {
  type: 'text',
};

export default FormInput;
