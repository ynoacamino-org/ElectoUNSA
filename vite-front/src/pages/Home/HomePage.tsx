import Banner from "../../assets/Banner.jpeg";

function HomePage() {
  return (
    <div className="w-full flex flex-col">

      {/* BANNER */}
      <div
        className="w-full h-[25vh] bg-cover bg-center relative flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: `url(${Banner})` }}
      >
        <div className="absolute inset-0 bg-[#651528]/70"></div>

        <div className="relative flex flex-col items-center gap-3 px-6 max-w-3xl">
          <h1 className="text-4xl font-extrabold text-center leading-tight">
            Bienvenido a ElectoUNSA
          </h1>

          <p className="text-lg opacity-90 text-center leading-relaxed">
            Tu plataforma central para la transparencia y participación en los 
            procesos electorales de la UNSA.
          </p>
        </div>
      </div>

      {/* SECCIÓN DE TARJETAS */}
      <div className="w-full h-[48vh] flex justify-center items-center ">
        <div className="flex flex-wrap justify-center items-stretch gap-10 w-[90%]">

          {/* CARD 1 */}
          <div className="bg-white rounded-xl shadow-lg p-10 flex-1 min-w-[300px] max-w-[400px] flex flex-col justify-center items-center text-center transition-all hover:shadow-xl min-h-[40vh] gap-3">
            <div className="w-28 h-28 bg-[#651528] rounded-full flex items-center justify-center">
              {/* Icono o imagen */}
            </div>
            <h3 className="text-2xl font-semibold text-[#651528]">Ver Listas</h3>
            <p className="text-gray-600 text-lg">
              Conoce a los candidatos y sus propuestas.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-xl shadow-lg p-10 flex-1 min-w-[300px] max-w-[400px] flex flex-col justify-center items-center text-center transition-all hover:shadow-xl min-h-[40vh] gap-3">
            <div className="w-28 h-28 bg-[#651528] rounded-full flex items-center justify-center">
              {/* Icono o imagen */}
            </div>
            <h3 className="text-2xl font-semibold text-[#651528]">Proceso Electoral</h3>
            <p className="text-gray-600 text-lg">
              Infórmate sobre fechas, normativas y reglamentos.
            </p>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE INFO */}
      <div className="h-35 flex flex-col justify-center items-center text-center px-6 mb-5">
        <h2 className="text-2xl font-bold text-gray-800">
          Información Electoral Clara y Accesible
        </h2>

        <p className="text-base text-gray-600 max-w-4xl mx-auto mt-3 leading-relaxed">
          Centralizamos y transparentamos toda la información sobre los procesos
          electorales de la universidad para facilitar la consulta a estudiantes
          y docentes.
        </p>

      </div>


      {/* SECCIÓN DE POSTULANTE */}
      <div className="w-[97%] flex flex-col md:flex-row items-center px-6 py-12 gap-6 bg-[#651528] m-5 rounded-2xl mx-auto">
        
        {/* TEXTO - 80% */}
        <div className="md:w-4/5 flex flex-col justify-center items-start gap-6 ml-8">
          <h2 className="text-3xl font-bold text-white">
            ¿Eres postulante?
          </h2>
          <p className="text-lg text-white">
            Gestiona tu lista desde el portal de postulantes
          </p>
          <button className="bg-[#1B2753] text-white font-semibold px-6 py-3 rounded-lg border border-white hover:bg-[#0f1b38] transition">
            Accede al portal
          </button>
        </div>

        {/* CÍRCULO / IMAGEN - 20% */}
        <div className="md:w-1/5 flex justify-center items-center">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full"></div>
        </div>

      </div>

      


    {/* --- SECCIÓN DESTACADAS --- */}
<div className="w-full py-10 px-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-gray-800 mb-8">
      Secciones Destacadas
    </h2>
    <div className="flex flex-wrap justify-center gap-8">
      
      {/* DESTACADA CARD 1 */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow w-full sm:w-70 md:w-90 cursor-pointer">
        <div className="h-50 bg-[#a86576] rounded-t-lg">
          {/* Bloque de color vino */}
        </div>
        <div className="p-7">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Elecciones Rectorado 2024
          </h3>
          <p className="text-sm text-gray-600">
            Listas que se encuentran postulando
          </p>
        </div>
      </div>

      {/* DESTACADA CARD 2 */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow w-full sm:w-70 md:w-90 cursor-pointer">
        <div className="h-50 bg-[#a86576] rounded-t-lg">
          {/* Bloque de color vino */}
        </div>
        <div className="p-7">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Normativa Electoral
          </h3>
          <p className="text-sm text-gray-600">
            Consulta los reglamentos vigentes
          </p>
        </div>
      </div>

      {/* DESTACADA CARD 3 */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow w-full sm:w-70 md:w-90 cursor-pointer">
        <div className="h-50 bg-[#a86576] rounded-t-lg">
          {/* Bloque de color vino */}
        </div>
        <div className="p-7">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Resultados Anteriores
          </h3>
          <p className="text-sm text-gray-600">
            Historial de Procesos Electorales
          </p>
        </div>
      </div>

    </div>
  </div>
</div>



    </div>
  );
}

export default HomePage;
