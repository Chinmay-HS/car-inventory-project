import React from 'react';

function Stats({ cars }) {
  // Calculate statistics
  const totalCars = cars.length;
  const availableCars = cars.filter(car => car.available).length;
  const unavailableCars = totalCars - availableCars;
  
  const totalValue = cars.reduce((sum, car) => sum + car.price, 0);
  const averagePrice = totalCars > 0 ? totalValue / totalCars : 0;
  
  const fuelTypes = cars.reduce((acc, car) => {
    acc[car.fuelType] = (acc[car.fuelType] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Inventory Stats</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-600">Total Cars</p>
          <p className="text-2xl font-bold text-blue-800">{totalCars}</p>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-green-600">Available</p>
          <p className="text-2xl font-bold text-green-800">{availableCars}</p>
        </div>
        
        <div className="bg-yellow-50 p-3 rounded-lg">
          <p className="text-sm text-yellow-600">Unavailable</p>
          <p className="text-2xl font-bold text-yellow-800">{unavailableCars}</p>
        </div>
        
        <div className="bg-purple-50 p-3 rounded-lg">
          <p className="text-sm text-purple-600">Average Price</p>
          <p className="text-2xl font-bold text-purple-800">${averagePrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Fuel Types</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(fuelTypes).map(([type, count]) => (
            <div key={type} className="bg-gray-100 px-3 py-1 rounded-full">
              <span className="font-medium">{type}:</span> {count}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stats;