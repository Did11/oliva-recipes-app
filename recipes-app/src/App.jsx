import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider'; 
import RecipeProvider from './contexts/RecipeProvider'; 
import Navbar from './components/Navbar';
import AppRoutes from './routes/Routes';
import Footer from './components/Footer';
import categories from './data/categories.json';

const App = () => {
  return (
    <AuthProvider>
      <RecipeProvider> 
        <Router>
          <Navbar categories={categories} /> {/* Pasar las categorías aquí */}
          <main className="flex-1">
            <AppRoutes />
          </main>
          <Footer className="bg-gray-800 text-white p-5 text-center w-full mt-auto" />
        </Router>
      </RecipeProvider>
    </AuthProvider>
  );
};

export default App;
