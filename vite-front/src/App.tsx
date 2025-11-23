import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRouter from './routes/AppRouter';
import './styles/variables.css';
import './styles/global.css';

function App() {
  return (
    <div className="app flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow">
        <AppRouter />
      </div>

      <Footer />
    </div>
  );
}

export default App;
