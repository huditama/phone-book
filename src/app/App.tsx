import React from 'react';
import { Styles } from './App.styles';

import Header from '../components/Header/Header';

function App() {
  return (
    <div className={Styles.mainLayout}>
      <Header />
      <div className={Styles.contentContainer}>
        <span>Hello World</span>
      </div>
    </div>
  );
}

export default App;
