import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider'; 
import RecipeProvider from './contexts/RecipeProvider'; 
import Navbar from './components/Navbar';
import AppRoutes from './routes/Routes';
import Footer from './components/Footer';

const App = () => {
  return (
    <AuthProvider>
      <RecipeProvider> 
        <Router>
          <Navbar />
          <AppRoutes />
          <Footer />
        </Router>
      </RecipeProvider>
    </AuthProvider>
  );
};

export default App;
