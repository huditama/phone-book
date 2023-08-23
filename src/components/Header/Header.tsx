import React, { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Styles } from './Header.styles';
import { HeaderType } from '../../types/types';

interface HeaderProps {
  type: HeaderType
  disableRightButton?: boolean | undefined,
  onClickRightButton?: (event: FormEvent) => void,
}

const Header: FC<HeaderProps> = ({ type, disableRightButton, onClickRightButton }) => {
  const navigate = useNavigate();

  const onClickBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  const onClickAdd = () => {
    navigate('/form');
  };

  return (
    <header className={Styles.header}>
      {
        type === HeaderType.Home ? (
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
            <button onClick={onClickAdd} className={Styles.addButton} type="button">
              <img
                src="/icons/add.png"
                alt="Add icon"
                className={Styles.addIcon}
              />
            </button>
          </>
        ) : (
          <>
            <button className={Styles.backButton} type="button" onClick={onClickBack}>
              <img
                src="/icons/back.png"
                alt="Back icon"
                className={Styles.icon}
              />
              <span>Contacts</span>
            </button>
            <button onClick={onClickRightButton} disabled={disableRightButton} className={Styles.backButton} type="button">
              <span className={Styles.rightButtonText(disableRightButton)}>{type === HeaderType.Details ? 'Edit' : 'Done'}</span>
            </button>
          </>
        )
      }
    </header>
  );
};

Header.defaultProps = {
  disableRightButton: false,
  onClickRightButton: () => null,
};

export default Header;
