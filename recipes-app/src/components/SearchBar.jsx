import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const SearchBar = ({ categories }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/recipes?search=${searchQuery}&category=${selectedCategory}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar recetas..."
        className="h-10 px-4 py-2 rounded bg-gray-200 text-gray-800"
      />
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
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SearchBar;
