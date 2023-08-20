import React from 'react';

import Styles from './Header.styles';

const Header = () => (
  <header className={Styles.header}>
    <div className={Styles.searchContainer}>
      <img
        src="/icons/search.png"
        alt="Search icon"
        className={Styles.searchIcon}
      />
      <input
        type="text"
        placeholder="Search a contact"
        className={Styles.searchInput}
      />
    </div>
  </header>
);

export default Header;
