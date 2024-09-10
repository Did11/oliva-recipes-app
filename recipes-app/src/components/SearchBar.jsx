import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const SearchBar = ({ categories }) => {
  const [searchQuery, setSearchQuery] = useState(''); // Estado para almacenar la búsqueda
  const [selectedCategory, setSelectedCategory] = useState(''); // Estado para almacenar la categoría seleccionada
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Redirige a la página de resultados de búsqueda con los parámetros de búsqueda y categoría
    navigate(`/recipes?search=${searchQuery}&category=${selectedCategory}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2">
      {/* Campo de entrada para la búsqueda */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar recetas..."
        className="h-10 px-4 py-2 rounded bg-gray-200 text-gray-800"
      />
      {/* Selector de categoría */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="h-10 px-4 py-2 rounded bg-gray-200 text-gray-800"
      >
        <option value="">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      {/* Botón de búsqueda */}
      <button
        type="submit"
        className="h-10 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 focus:outline-none"
      >
        Buscar
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired, // El ID de la categoría es requerido
      name: PropTypes.string.isRequired, // El nombre de la categoría es requerido
    })
  ).isRequired, // Las categorías son obligatorias
};

export default SearchBar;
