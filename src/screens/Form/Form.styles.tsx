import { css } from '@emotion/css';

const Styles = {
  container: css({
    padding: '16px',
  }),
  spacer: (space: number) => css({
    height: `${space}px`,
  }),
  addPhoneButton: css({
    color: 'inherit',
    border: 'none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: '4px',
    height: '30px',
    width: '100%',
  }),
  addIcon: css({
    height: '16px',
    width: '16px',
    marginRight: '8px',
  }),
};

export { Styles };
