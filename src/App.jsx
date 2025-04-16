import { useState, useEffect } from 'react';
import Header from './components/Header'; 
import Stats from './components/Stats'; 
import FilterBar from './components/FilterBar'; 
import CarForm from './components/CarForm'; 
import CarList from './components/CarList'; 
import useLocalStorage from './hooks/useLocalStorage'; 
import carsData from './data/cars.json'; 
import './App.css';

function App() {
  // Use local storage to persist the car data
  const [cars, setCars] = useLocalStorage('carInventory', carsData);
  
  // State for filters
  const [filters, setFilters] = useState({
    searchTerm: '',
    make: '',
    fuelType: '',
    availability: 'all',
    sortBy: 'newest'
  });
  
  // Filtered and sorted cars
  const [filteredCars, setFilteredCars] = useState([]);
  
  // Filter and sort cars when filters or cars change
  useEffect(() => {
    let result = [...cars];
    
    // Apply search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(car => 
        car.make.toLowerCase().includes(searchLower) ||
        car.model.toLowerCase().includes(searchLower) ||
        car.color.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply make filter
    if (filters.make) {
      result = result.filter(car => car.make === filters.make);
    }
    
    // Apply fuel type filter
    if (filters.fuelType) {
      result = result.filter(car => car.fuelType === filters.fuelType);
    }
    
    // Apply availability filter
    if (filters.availability !== 'all') {
      const isAvailable = filters.availability === 'available';
      result = result.filter(car => car.available === isAvailable);
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'newest':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'oldest':
        result.sort((a, b) => a.year - b.year);
        break;
      case 'priceLow':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'mileageLow':
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      default:
        break;
    }
    
    setFilteredCars(result);
  }, [cars, filters]);
  
  // Add a new car
  const handleAddCar = (newCar) => {
    setCars(prevCars => [...prevCars, newCar]);
  };
  
  // Delete a car
  const handleDeleteCar = (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      setCars(prevCars => prevCars.filter(car => car.id !== id));
    }
  };
  
  // Toggle car availability
  const handleToggleAvailability = (id) => {
    setCars(prevCars => 
      prevCars.map(car => 
        car.id === id ? { ...car, available: !car.available } : car
      )
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <Stats cars={cars} />
        <CarForm onAddCar={handleAddCar} />
        <FilterBar filters={filters} setFilters={setFilters} />
        
        <CarList 
          cars={filteredCars} 
          onDeleteCar={handleDeleteCar}
          onToggleAvailability={handleToggleAvailability}
        />
      </main>
      
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>Car Inventory System &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;