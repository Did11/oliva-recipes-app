import { useEffect } from 'react';

const LoadDataScript = () => {
  useEffect(() => {
    const link = document.getElementById('loadDataLink');

    const handleClick = (event) => {
      event.preventDefault(); // Evitar comportamiento por defecto del enlace

      // Cargar el JSON desde el archivo en src/data/
      fetch('/src/data/recipes.json')
        .then(response => response.json())
        .then(data => {
          // Almacenar los datos en localStorage bajo la clave correcta
          localStorage.setItem('recipes', JSON.stringify(data));
          console.log('Recetas guardadas en localStorage bajo la clave "recipes"');
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
    };

    // Añadir el evento de clic al enlace
    link.addEventListener('click', handleClick);

    // Limpiar el evento para evitar múltiples adiciones
    return () => {
      link.removeEventListener('click', handleClick);
    };
  }, []);

  return null; // No renderiza ningún elemento visual
};

export default LoadDataScript;
