import Banner from "../../assets/Banner.jpeg";

function HomePage() {
  return (
    <div className="w-full flex flex-col">

      {/* BANNER */}
      <div
        className="w-full h-[30vh] bg-cover bg-center relative flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: `url(${Banner})` }}
      >
        <div className="absolute inset-0 bg-[#651528]/70"></div>

        <div className="relative flex flex-col items-center gap-6 px-6 max-w-3xl">
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
      <div className="w-full h-[40vh] flex justify-center items-center bg-[#651528]">
        <div className="flex flex-wrap justify-center items-stretch gap-10 w-[90%]">

          {/* CARD 1 */}
          <div className="bg-white rounded-xl shadow-lg p-10 flex-1 min-w-[300px] max-w-[400px] flex flex-col justify-center items-center text-center transition-all hover:shadow-xl min-h-[35vh] gap-3">
            <div className="w-28 h-28 bg-[#651528] rounded-full flex items-center justify-center">
              {/* Icono o imagen */}
            </div>
            <h3 className="text-2xl font-semibold text-[#651528]">Ver Listas</h3>
            <p className="text-gray-600">
              Conoce a los candidatos y sus propuestas.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-xl shadow-lg p-10 flex-1 min-w-[300px] max-w-[400px] flex flex-col justify-center items-center text-center transition-all hover:shadow-xl min-h-[35vh] gap-3">
            <div className="w-28 h-28 bg-[#651528] rounded-full flex items-center justify-center">
              {/* Icono o imagen */}
            </div>
            <h3 className="text-2xl font-semibold text-[#651528]">Proceso Electoral</h3>
            <p className="text-gray-600">
              Infórmate sobre fechas, normativas y reglamentos.
            </p>
          </div>


        </div>
      </div>






      {/* SECCIÓN DE INFO */}
      <div className="h-40 flex flex-col justify-center items-center text-center px-6 mb-20">
        <h2 className="text-2xl font-bold text-gray-800">
          Información Electoral Clara y Accesible
        </h2>

        <p className="text-base text-gray-600 max-w-4xl mx-auto mt-6 leading-relaxed">
          Centralizamos y transparentamos toda la información sobre los procesos
          electorales de la universidad para facilitar la consulta a estudiantes
          y docentes.
        </p>

      </div>


    </div>
  );
}

export default HomePage;
