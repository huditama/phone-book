import { css } from '@emotion/css';

import { ButtonType } from '../../types/types';

const Styles = {
  dialog: css({
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1000',
    opacity: '0',
    visibility: 'hidden',
    transition: 'opacity 0.3s, visibility 0.3s',
    '&.open': {
      opacity: '1',
      visibility: 'visible',
    },
  }),
  overlay: css({
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: '-1',
  }),
  dialogBox: css({
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  }),
  button: (buttonType: ButtonType) => css({
    background: 'none',
    color: buttonType === ButtonType.Confirm ? '#147EFB' : '#FC3D39',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    outline: 'inherit',
    marginRight: '10px',
  }),
};

export { Styles };
