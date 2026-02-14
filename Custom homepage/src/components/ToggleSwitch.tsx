import styles from '../styles/toggle.module.css';

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

function ToggleSwitch({ label, checked, onChange }: ToggleSwitchProps) {
  return (
    <div className={styles.toggleContainer}>
      <span className={styles.label}>{label}</span>
      <label className={styles.switch}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
}

export default ToggleSwitch;
