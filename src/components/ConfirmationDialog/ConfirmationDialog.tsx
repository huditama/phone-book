/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC } from 'react';

import { Styles } from './ConfirmationDialog.styles';
import { ButtonType } from '../../types/types';

interface ConfirmationDialogProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  message,
  isOpen,
  onClose,
  onConfirm,
}) => (
  <div className={`${isOpen ? 'open' : ''} ${Styles.dialog}`}>
    <div className={Styles.overlay} onClick={onClose} />
    <div className={`dialog ${Styles.dialogBox}`}>
      <p>{message}</p>
      <button className={Styles.button(ButtonType.Confirm)} type="button" onClick={onConfirm}>
        Confirm
      </button>
      <button className={Styles.button(ButtonType.Cancel)} onClick={onClose} type="button">Cancel</button>
    </div>
  </div>
);

export default ConfirmationDialog;
