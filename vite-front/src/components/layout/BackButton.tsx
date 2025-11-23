import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="back-button"
      aria-label="Volver atrás"
    >
      ← Volver
    </button>
  );
}

export default BackButton;
