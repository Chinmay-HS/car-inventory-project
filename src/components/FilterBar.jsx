import React from 'react';

function FilterBar({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleAvailabilityChange = (e) => {
    const { value } = e.target;
    setFilters(prev => ({ ...prev, availability: value }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      make: '',
      fuelType: '',
      availability: 'all',
      sortBy: 'newest'
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-6">
      <div className="md:flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700 mb-3 md:mb-0">Filter Cars</h2>
        <button 
          onClick={clearFilters}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300"
        >
          Clear Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-3">
        <div>
          <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            id="searchTerm"
            name="searchTerm"
            value={filters.searchTerm}
            onChange={handleChange}
            placeholder="Search cars..."
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">Make</label>
          <select
            id="make"
            name="make"
            value={filters.make}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All Makes</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Ford">Ford</option>
            <option value="Tesla">Tesla</option>
            <option value="BMW">BMW</option>
            <option value="Mazda">Mazda</option>
            <option value="Audi">Audi</option>
            <option value="Hyundai">Hyundai</option>
          </select>
        </div>

        <div>
          <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
          <select
            id="fuelType"
            name="fuelType"
            value={filters.fuelType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All Types</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
          <select
            id="availability"
            name="availability"
            value={filters.availability}
            onChange={handleAvailabilityChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="all">All Cars</option>
            <option value="available">Available Only</option>
            <option value="unavailable">Unavailable Only</option>
          </select>
        </div>

        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select
            id="sortBy"
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="mileageLow">Mileage: Low to High</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;