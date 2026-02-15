import "bootstrap-icons/font/bootstrap-icons.css";
import styles from '../styles/settings.module.css';
import { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import { useTimeFormat } from '../context/TimeFormatContext';
import { useVisibility } from '../context/VisibilityContext';
import Wallpaper from "./wallpaper";

function Settings() {
  const [showOverlay, setShowOverlay] = useState(false);
  const { is24Hour, toggleTimeFormat } = useTimeFormat();
  const { showClock, showBookmarks, showSearch, showTodo, toggleClock, toggleBookmarks, toggleSearch, toggleTodo } = useVisibility();

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
          <h3 style={{ margin: '10px 0 5px 0', display: "block" }}>Display Options</h3>
          <ToggleSwitch 
            label="Show Clock" 
            checked={showClock} 
            onChange={toggleClock} 
          />
          <ToggleSwitch 
            label="Show Bookmarks" 
            checked={showBookmarks} 
            onChange={toggleBookmarks} 
          />
          <ToggleSwitch 
            label="Show Search" 
            checked={showSearch} 
            onChange={toggleSearch} 
          />
          <ToggleSwitch 
            label="Show To-Do" 
            checked={showTodo} 
            onChange={toggleTodo} 
          />
          <h3 style={{ margin: '20px 0 5px 0', display: "block" }}>Clock Options</h3>
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