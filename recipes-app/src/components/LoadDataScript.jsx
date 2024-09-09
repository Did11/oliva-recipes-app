import { useEffect } from 'react';

const LoadDataScript = () => {
  useEffect(() => {
    const link = document.getElementById('loadDataLink');

    const handleClick = (event) => {
      event.preventDefault(); // Evitar comportamiento por defecto del enlace

      // Cargar y almacenar los usuarios
      fetch('/src/data/users.json')
        .then(response => response.json())
        .then(usersData => {
          localStorage.setItem('users', JSON.stringify(usersData));
          console.log('Usuarios guardados en localStorage bajo la clave "users"');
          
          // Luego de cargar los usuarios, cargar y almacenar las recetas
          return fetch('/src/data/recipes.json');
        })
        .then(response => response.json())
        .then(recipesData => {
          localStorage.setItem('recipes', JSON.stringify(recipesData));
          console.log('Recetas guardadas en localStorage bajo la clave "recipes"');
          
          // Luego de cargar las recetas, cargar y almacenar los follows
          return fetch('/src/data/follows.json');
        })
        .then(response => response.json())
        .then(followsData => {
          localStorage.setItem('followRecipesByUser', JSON.stringify(followsData));
          console.log('Follows guardados en localStorage bajo la clave "followRecipesByUser"');
        })
        .catch(error => console.error('Error al cargar los datos JSON:', error));
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
