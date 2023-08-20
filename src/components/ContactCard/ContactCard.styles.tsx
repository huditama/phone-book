import { css } from '@emotion/css';

const Styles = {
  contactCard: (index: number) => css({
    marginTop: index === 0 ? '-16px' : '0px',
    display: 'flex',
    alignItems: 'center',
    height: '50px',
    textDecoration: 'none',
    color: 'black',
    backgroundColor: 'white',
    borderTop: index === 0 ? '' : '1px solid #E1E1E1',
  }),
};

export { Styles };
