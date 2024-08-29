import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import Navbar from './components/Navbar'; 
import AppRoutes from './routes/Routes'; 
import Footer from './components/Footer';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Incluye el Navbar */}
        <AppRoutes /> {/* Utiliza las rutas centralizadas */}
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
