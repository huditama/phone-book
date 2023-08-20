import React, { FC, ReactElement } from 'react';
import { Styles } from './Layout.styles';

interface LayoutProps {
  children: ReactElement,
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <div className={Styles.mainLayout}>
    {children}
  </div>
);

export default Layout;
