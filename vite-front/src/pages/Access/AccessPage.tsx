import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/layout/BackButton';
import allowedCredentials from '../../data/allowedEmails.json';

export default function AccessPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email.trim()) {
      setError('Por favor ingresa tu email');
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError('Por favor ingresa tu contraseña');
      setLoading(false);
      return;
    }

    // Validar credenciales
    const credentials = (allowedCredentials as any).allowedCredentials;
    const isCredentialValid = credentials.some(
      (cred: any) => cred.email === email && cred.password === password
    );

    if (!isCredentialValid) {
      setError('Email o contraseña incorrectos');
      setLoading(false);
      return;
    }

    // Guardar en localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);

    setLoading(false);
    navigate('/');
  };

  return (
    <div className="access-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-6 left-6">
        <BackButton />
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-unsa-granate rounded-full"></div>
        </div>

        <h1 className="text-2xl font-bold mb-2 text-center text-unsa-granate">
          Bienvenido a ElectoUNSA
        </h1>

        <p className="text-gray-600 text-sm text-center mb-6">
          Acceso exclusivo para cuentas autorizadas.
          <br />
          Solo los administradores y postulantes registrados pueden ingresar.
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@unsa.edu.pe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-unsa-granate focus:ring-1 focus:ring-unsa-granate"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-unsa-granate focus:ring-1 focus:ring-unsa-granate"
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-unsa-granate text-white font-semibold py-2 rounded-lg hover:bg-[#4a0f1e] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <a href="#" onClick={(e) => e.preventDefault()} className="text-center block mt-4 text-sm text-gray-600 hover:text-unsa-granate transition">
          ¿Necesitas ayuda? Contacta a soporte
        </a>
      </div>
    </div>
  );
}
