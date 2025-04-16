import React from 'react';
import CarCard from './CarCard';

function CarList({ cars, onDeleteCar, onToggleAvailability }) {
  if (cars.length === 0) {
    return (
      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <h3 className="text-xl font-semibold text-gray-700">No cars found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your filters or add new cars to your inventory.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cars.map(car => (
        <CarCard 
          key={car.id} 
          car={car} 
          onDelete={onDeleteCar}
          onToggleAvailability={onToggleAvailability}
        />
      ))}
    </div>
  );
}

export default CarList;