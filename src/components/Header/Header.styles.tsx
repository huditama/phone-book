import { css } from '@emotion/css';

const Styles = {
  header: css({
    height: '30px',
    position: 'sticky',
    top: 0,
    padding: '8px 16px 8px 16px',
    backgroundColor: '#FFF',
    boxShadow: '0 0 48px 0 rgba(0, 0, 0, .2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  searchIcon: css({
    height: '16px',
    width: '16px',
    marginRight: '8px',
  }),
  searchContainer: css({
    backgroundColor: '#E1E1E1',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '5px 8px 5px 8px',
    borderRadius: '4px',
    width: '100%',
  }),
  searchInput: css({
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    width: '100%',
  }),
  backButton: css({
    background: 'none',
    color: 'inherit',
    border: 'none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }),
};

export { Styles };
