import React from 'react';
import Clock from '../../widgets/Clock';
import Weather from '../../widgets/Weather';
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Clock/>
      <Weather/>
    </div>
  );
}

export default App;
