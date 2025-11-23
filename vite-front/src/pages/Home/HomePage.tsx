const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Idealmente el Navbar va en un MainLayout, pero para el ejemplo: */}
      
      {/* 1. Hero Section (Imagen de fondo con título) */}
      <header className="relative h-80 bg-gray-800 flex items-center justify-center text-center px-4">
        {/* Imagen de fondo oscurecida */}
        <div className="absolute inset-0 bg-[url('/ruta-imagen-unsa.jpg')] bg-cover bg-center opacity-40"></div>
        <div className="relative z-10 text-white max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Bienvenido a ElectoUNSA</h1>
          <p className="text-lg">Tu plataforma central para la transparencia y participación en los procesos electorales de la UNSA</p>
        </div>
      </header>

      <main className="flex-grow px-4 pb-12">
        {/* 2. Tarjetas Principales (Ver Listas / Ver Proceso) */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto -mt-10 relative z-20">
           {/* Tarjeta 1 */}
           <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-unsa-azul hover:shadow-xl transition">
              <div className="w-16 h-16 bg-unsa-granate rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-unsa-granate mb-2">Ver Listas</h3>
              <p className="text-unsa-gris text-sm">Conoce a los candidatos y sus propuestas</p>
           </div>
           {/* Tarjeta 2 */}
           <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-cyan-500 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-unsa-granate rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-unsa-granate mb-2">Ver Proceso</h3> {/* Cambié el texto según tu imagen 2da caja */}
              <p className="text-unsa-gris text-sm">Infórmate sobre las fechas y normativas</p>
           </div>
        </div>

        {/* 3. Texto Informativo */}
        <div className="text-center my-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-unsa-granate mb-4">Información Electoral Clara y Accesible</h2>
          <p className="text-unsa-gris">Centralizamos y transparentamos toda la información...</p>
        </div>

        {/* 4. Banner Postulante */}

        {/* 5. Secciones Destacadas */}
        <section className="max-w-5xl mx-auto mt-12">
           <h2 className="text-2xl font-bold text-unsa-granate mb-6">Secciones Destacadas</h2>
           <div className="grid md:grid-cols-3 gap-6">
              {/* Ejemplo de Item */}
              {['Elecciones Rectorado 2024', 'Normativa Electoral', 'Resultados Anteriores'].map((titulo) => (
                <div key={titulo} className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
                   <div className="h-32 bg-gray-300 rounded mb-4 bg-unsa-gris/50"></div>
                   <h4 className="font-bold text-unsa-granate">{titulo}</h4>
                   <p className="text-xs text-gray-500 mt-2">Descripción breve...</p>
                </div>
              ))}
           </div>
        </section>
      </main>
      
      <footer className="bg-unsa-granate text-white text-center py-4 mt-12">
         ElectoUNSA
      </footer>
    </div>
  );
};

export default HomePage;