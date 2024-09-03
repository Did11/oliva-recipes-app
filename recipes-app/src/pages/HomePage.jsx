import LoadDataScript from '../components/LoadDataScript';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Bienvenido a la Aplicación de Recetas
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Esta es una aplicación de recetas desarrollada en React. El proyecto está diseñado para ayudarte a gestionar y explorar una variedad de recetas, cada una categorizada para facilitar su búsqueda.
      </p>
      <img src="/images/portada.jpg" alt="Portada de recetas" className="w-full max-w-md rounded-lg shadow-md mb-6" />
      <p className="text-lg text-gray-600 mb-6 text-center">
        Puedes comenzar explorando las recetas disponibles. Si es la primera vez que visitas la aplicación, asegúrate de cargar los datos iniciales haciendo clic <a href="#" id="loadDataLink" className="text-blue-500 hover:underline">AQUÍ</a>.
      </p>
      <LoadDataScript />
    </div>
  );
};

export default HomePage;
