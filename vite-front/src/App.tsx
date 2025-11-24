import { useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRouter from './routes/AppRouter';
import "./index.css";

function App() {
  const location = useLocation();
  const isAccessPage = location.pathname === '/acceso';

  return (
    <div className="app flex flex-col min-h-screen">
      {!isAccessPage && <Navbar />}

      <div className="flex-grow">
        <AppRouter />
      </div>

      {!isAccessPage && <Footer />}
    </div>
  );
}

export default App;
