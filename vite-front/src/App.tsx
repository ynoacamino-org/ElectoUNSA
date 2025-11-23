import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100">
  <h1 className="text-4xl font-bold text-unsa-granate mb-4">ElectoUNSA</h1>
  <button className="bg-unsa-azul text-white px-6 py-2 rounded shadow hover:bg-blue-900 transition">
    Botón de Prueba
  </button>
</div>
  )
}

export default App
