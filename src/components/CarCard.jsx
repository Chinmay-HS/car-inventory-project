import React from 'react';

function CarCard({ car, onDelete, onToggleAvailability }) {
  const { id, make, model, year, color, price, mileage, fuelType, transmission, available, image } = car;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-105">
      <img 
        src={image} 
        alt={`${make} ${model}`} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold text-gray-800">{make} {model}</h2>
          <span className={`px-2 py-1 text-xs font-bold rounded ${available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {available ? 'Available' : 'Unavailable'}
          </span>
        </div>
        
        <p className="text-gray-700 mt-1">{year} • {color}</p>
        
        <div className="mt-3 space-y-1">
          <p className="text-gray-600 flex justify-between">
            <span>Price:</span> 
            <span className="font-semibold">${price.toLocaleString()}</span>
          </p>
          <p className="text-gray-600 flex justify-between">
            <span>Mileage:</span> 
            <span>{mileage.toLocaleString()} mi</span>
          </p>
          <p className="text-gray-600 flex justify-between">
            <span>Fuel:</span> 
            <span>{fuelType}</span>
          </p>
          <p className="text-gray-600 flex justify-between">
            <span>Transmission:</span> 
            <span>{transmission}</span>
          </p>
        </div>
        
        <div className="mt-4 flex justify-between space-x-2">
          <button 
            onClick={() => onToggleAvailability(id)} 
            className={`px-3 py-1 rounded text-sm ${
              available 
                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            Mark {available ? 'Unavailable' : 'Available'}
          </button>
          <button 
            onClick={() => onDelete(id)}
            className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarCard;