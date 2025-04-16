import React, { useState } from 'react';

function CarForm({ onAddCar }) {
  const initialFormState = {
    make: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    price: '',
    mileage: '',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    available: true
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert string values to numbers where appropriate
    const newCar = {
      ...formData,
      id: Date.now(),
      year: Number(formData.year),
      price: Number(formData.price),
      mileage: Number(formData.mileage),
      image: "/api/placeholder/400/250"
    };
    
    onAddCar(newCar);
    setFormData(initialFormState);
    setIsFormVisible(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Add New Car</h2>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isFormVisible ? 'Cancel' : 'Add New Car'}
        </button>
      </div>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">Make</label>
            <input
              type="text"
              id="make"
              name="make"
              value={formData.make}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">Model</label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              min="1900"
              max={new Date().getFullYear() + 1}
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              min="0"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-1">Mileage</label>
            <input
              type="number"
              id="mileage"
              name="mileage"
              min="0"
              value={formData.mileage}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
            <select
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
            <select
              id="transmission"
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="available"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="available" className="ml-2 block text-sm text-gray-700">Available for Sale</label>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Car to Inventory
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CarForm;