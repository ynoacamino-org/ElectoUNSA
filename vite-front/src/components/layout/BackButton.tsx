import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.css';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={styles.button}
      aria-label="Volver atrás"
    >
      <span className={styles.icon} aria-hidden>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <span className={styles.label}>Volver</span>
    </button>
  );
}

export default BackButton;
