import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import Navbar from './components/Navbar'; 
import AppRoutes from './routes/Routes'; 

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Incluye el Navbar */}
        <AppRoutes /> {/* Utiliza las rutas centralizadas */}
      </Router>
    </AuthProvider>
  );
};

export default App;
