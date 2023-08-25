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
  paginationButton: (disabled: boolean) => css({
    background: 'none',
    color: disabled ? '#E1E1E1' : '#147EFB',
    border: 'none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
  }),
  pageText: css({
    fontSize: '14px',
    margin: '0px 8px 0px 8px',
  }),
  pagination: css({
    marginTop: '16px',
  }),
};

export { Styles };
