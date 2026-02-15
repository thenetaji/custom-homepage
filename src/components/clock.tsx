import { useState, useEffect } from 'react';
import styles from '../styles/clock.module.css';
import { useTimeFormat } from '../context/TimeFormatContext';

function Clock() {
  const { is24Hour } = useTimeFormat();
  const [time, setTime] = useState(getCurrentTime());

  function getCurrentTime() {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    if (is24Hour) {
      return `${hours.toString().padStart(2, '0')} : ${minutes}`;
    } else {
      const period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      return `${hours.toString().padStart(2, '0')} : ${minutes} ${period}`;
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [is24Hour]);

  return (
    <div className={styles.clock}>
      <p className={styles.time}>{time}</p>
    </div>
  );
}

export default Clock;
