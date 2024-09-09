import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider'; 
import RecipeProvider from './contexts/RecipeProvider'; 
import Navbar from './components/Navbar';
import AppRoutes from './routes/Routes';
import Footer from './components/Footer';
import categories from './data/categories.json';

const App = () => {
  return (
    // Proveer contexto de autenticación a la aplicación
    <AuthProvider>
      {/* Proveer contexto de recetas a la aplicación */}
      <RecipeProvider> 
        {/* Configurar el enrutamiento principal de la aplicación */}
        <Router>
          {/* Renderizar la barra de navegación y pasar categorías como props */}
          <Navbar categories={categories} /> 
          
          {/* Contenido principal de la aplicación */}
          <main className="flex-1">
            <AppRoutes />
          </main>

          {/* Renderizar el pie de página */}
          <Footer className="bg-gray-800 text-white p-5 text-center w-full mt-auto" />
        </Router>
      </RecipeProvider>
    </AuthProvider>
  );
};

export default App;
