import { css } from '@emotion/css';

const Styles = {
  container: (index: number) => css({
    padding: '16px',
    backgroundColor: '#E1E1E1',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '8px',
    justifyContent: 'space-between',
    marginTop: index === 0 ? '0px' : '16px',
  }),
  ctaContainer: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }),
  ctaButton: css({
    height: '40px',
    width: '40px',
    borderRadius: '20px',
    background: 'white',
    color: 'inherit',
    border: 'none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 0 48px 0 rgba(0, 0, 0, .2)',
  }),
  ctaIcon: css({
    height: '25px',
    width: '25px',
  }),
  ctaSpacer: css({
    width: '8px',
  }),
};

export { Styles };
