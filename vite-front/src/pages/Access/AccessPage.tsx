import BackButton from '../../components/layout/BackButton';

function AccessPage() {
  return (
    <div className="access-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-6 left-6">
        <BackButton />
      </div>

      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
        {/* Formulario de login aquí */}
      </div>
    </div>
  );
}

export default AccessPage;
