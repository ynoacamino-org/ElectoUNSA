import React from "react";
import { useNavigate } from "react-router-dom";
import BackButton from '../../components/layout/BackButton';
import styles from "./AccessPage.module.css";

const GoogleIcon: React.FC = () => (
    <svg width="18" height="18" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path fill="#4285F4" d="M533.5 278.4c0-18.5-1.6-36.3-4.6-53.6H272v101.2h147.1c-6.4 35-25.8 64.7-55 84.6v70.1h88.8c52-48 82.6-118.4 82.6-202.3z"/>
        <path fill="#34A853" d="M272 544.3c74.4 0 136.8-24.6 182.4-66.7l-88.8-70.1c-24.7 16.6-56.4 26.4-93.6 26.4-71.9 0-132.9-48.6-154.8-114.1H28.8v71.7C73.7 489 165.4 544.3 272 544.3z"/>
        <path fill="#FBBC05" d="M117.2 328.8c-10.8-32.5-10.8-67.6 0-100.1V157H28.8C10.1 197.7 0 236.9 0 278.7s10.1 81 28.8 121.7l88.4-71.6z"/>
        <path fill="#EA4335" d="M272 109.6c39.9 0 75.8 13.7 104 40.5l78-78C405.1 24.2 342.7 0 272 0 165.4 0 73.7 55.3 28.8 137.7l88.4 71.7C139.1 158.2 200.1 109.6 272 109.6z"/>
    </svg>
);

export default function AccessPage() {
  const navigate = useNavigate();

  return (
    <div className="access-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-6 left-6">
        <BackButton />
      </div>

      <div className={styles.card}>
        <div className={styles.logo} aria-hidden></div>

        <h1 className={styles.title}>
          Bienvenido a
          <br />
          ElectoUNSA
        </h1>

        <p className={styles.description}>
          Acceso exclusivo para cuentas autorizadas.
          <br />
          Solo los administradores y postulantes
          <br />
          registrados pueden ingresar para gestionar la 
          <br />
          información electoral
        </p>

        <button
          className={styles.googleBtn}
          onClick={(e) => {
            e.preventDefault();
            // placeholder: aquí irá la acción real (OAuth) para conectar al backend
          }}
        >
          <span className={styles.icon}><GoogleIcon /></span>
          <span className={styles.btnText}>Iniciar sesión con Google</span>
        </button>

        <a className={styles.help} href="#" onClick={(e) => e.preventDefault()}>
          ¿Necesitas ayuda? Contacta a soporte
        </a>
      </div>
    </div>
  );
}
