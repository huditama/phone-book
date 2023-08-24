import { css } from '@emotion/css';

const Styles = {
  layout: css({
    padding: '16px',
  }),
  contactImage: css({
    height: '100px',
    width: '100px',
    borderRadius: '50px',
    backgroundColor: '#E1E1E1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  contactImageContainer: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: '16px',
  }),
  contactName: css({
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '16px',
  }),
  ctaButton: css({
    marginTop: '16px',
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
};

export { Styles };
