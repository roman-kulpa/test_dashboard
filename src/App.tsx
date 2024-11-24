import React, {useEffect, useState} from 'react';
import styles from './app.module.css';

const week_days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function App() {
  const [hours, setHours] = useState('--');
  const [minutes, setMinutes] = useState('--');
  const [seconds, seSeconds] = useState('--');
  const [date, setDate] = useState('-------');

  useEffect(() => {
    const clockInterval = setInterval(() => {
      const date = new Date();

      setHours(("0" + date.getHours()).slice(-2));
      setMinutes(("0" + date.getMinutes()).slice(-2));
      seSeconds(("0" + date.getSeconds()).slice(-2));
      setDate(new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date));
    }, 1000)

    return () => {
      clearInterval(clockInterval);
    };
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.clock}>
        <div className="hours">{hours}</div>
        <div>:</div>
        <div className="minutes">{minutes}</div>
        <div>:</div>
        <div className="seconds">{seconds}</div>
      </div>
      <div className={styles.date}>
        {date}
      </div>
    </div>
  );
}

export default App;
