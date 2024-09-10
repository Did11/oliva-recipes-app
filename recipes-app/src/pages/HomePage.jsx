import LoadDataScript from '../components/LoadDataScript';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#f0e6d5] p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Bienvenido a la Aplicación de Recetas
        </h1>
        
        <p className="text-xl text-gray-600 mb-6">
          En esta aplicación, puedes crear usuarios, agregar tus propias recetas y seguir a otros autores para descubrir nuevas ideas culinarias. ¡Explora las recetas y comparte las tuyas! 
        </p>
        
        <img src="/images/portada.jpg" alt="Portada de recetas" className="w-full max-w-3xl rounded-lg shadow-md mx-auto mb-8" />
        <p className="text-xl text-gray-600 mb-6">
          Para facilitarte el acceso, te ofrecemos un modo de prueba con datos preconfigurados. A continuación, se ofrece un enlace para cargar estos datos. Además, puedes acceder con los siguientes usuarios:
        </p>

        <div className="bg-orange-100 border border-orange-300 rounded-2xl p-6 text-center max-w-2xl mx-auto shadow-lg mb-6">
          <p className="text-xl text-gray-700 font-semibold mb-4">
            ¡Importante! Para comenzar, asegúrate de cargar los datos iniciales.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            Haz clic en el botón para cargar los datos:
          </p>
          <a href="#" id="loadDataLink" className="inline-block bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200">
            Cargar Datos
          </a>
        </div>

        <ul className="text-lg text-gray-700 list-disc list-inside mb-6">
          <li><strong>Didier</strong> - Contraseña: Argentina2022</li>
          <li><strong>Laura</strong> - Contraseña: Argentina2022</li>
          <li><strong>Diego</strong> - Contraseña: Argentina2022</li>
        </ul>
      </div>

      <LoadDataScript />
    </div>
  );
};

export default HomePage;
