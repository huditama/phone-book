import { css } from '@emotion/css';

const Styles = {
  mainLayout: css({
    boxShadow: '0 0 48px 0 rgba(0, 0, 0, .2)',
    backgroundColor: '#fff',
    minHeight: '100vh',
    maxWidth: '500px',
    margin: '0 auto',
    position: 'relative',
  }),
  contentContainer: css({
    padding: '16px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  }),
  header: css({
    backgroundColor: '#E1E1E1',
    height: 30,
    margin: '-16px -16px 16px -16px',
    padding: '0px 16px 0px 16px',
    display: 'flex',
    alignItems: 'center',
  }),
  spacer: css({
    height: '16px',
  }),
};

export { Styles };
