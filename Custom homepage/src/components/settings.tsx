import "bootstrap-icons/font/bootstrap-icons.css";
import styles from '../styles/settings.module.css';
import { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import { useTimeFormat } from '../context/TimeFormatContext';
import Wallpaper from "./wallpaper";

function Settings() {
  const [showOverlay, setShowOverlay] = useState(false);
  const { is24Hour, toggleTimeFormat } = useTimeFormat();

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <>
      <div className={styles.settings} onClick={toggleOverlay}>
          <i className={`bi bi-gear ${styles.icons}`}></i>
      </div>
      {showOverlay && (
        <div className={styles.overlay}>
          <h3 style={{ margin: '10px 0 0 0' , display: "block"}}>Settings</h3>
          <hr className={styles.divider}></hr>
          <ToggleSwitch 
            label="24 Hour Format" 
            checked={is24Hour} 
            onChange={toggleTimeFormat} 
          />
          <h3 style={{ margin: '20px 0 10px 0', display: "block" }}>Wallpaper</h3>
          <Wallpaper />
        </div>
      )}
    </>
  );
}

export default Settings;