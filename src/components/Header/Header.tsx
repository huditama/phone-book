import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Styles } from './Header.styles';
import { HeaderType } from '../../types/types';

interface HeaderProps {
  type: HeaderType
}

const Header: FC<HeaderProps> = ({ type }) => {
  const navigate = useNavigate();

  const onClickBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <header className={Styles.header}>
      {
        type === HeaderType.Home && (
          <>
            <div className={Styles.searchContainer}>
              <img
                src="/icons/search.png"
                alt="Search icon"
                className={Styles.icon}
              />
              <input
                type="text"
                placeholder="Search a contact"
                className={Styles.searchInput}
              />
            </div>
            <button className={Styles.addButton} type="button">
              <img
                src="/icons/add.png"
                alt="Add icon"
                className={Styles.addIcon}
              />
            </button>
          </>
        )
      }

      {
        type === HeaderType.Details && (
          <>
            <button className={Styles.backButton} type="button" onClick={onClickBack}>
              <img
                src="/icons/back.png"
                alt="Back icon"
                className={Styles.icon}
              />
              <span>Contacts</span>
            </button>
            <button className={Styles.backButton} type="button">
              <span>Edit</span>
            </button>
          </>
        )
      }
    </header>
  );
};

export default Header;
