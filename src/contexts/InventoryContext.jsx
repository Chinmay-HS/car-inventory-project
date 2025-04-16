import { createContext, useContext, useState, useEffect } from "react";
import carsData from "../data/cars.json";
import manufacturers from "../data/manufacturers.json";
import serviceHistory from "../data/serviceHistory.json";

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  
  useEffect(() => {
    setCars(carsData);
  }, []);

  const getCarById = (id) => cars.find(car => car.id === id);
  const getServiceHistory = (carId) => serviceHistory.filter(s => s.carId === carId);
  const getManufacturerInfo = (make) => manufacturers.find(m => m.name === make);

  return (
    <InventoryContext.Provider value={{ cars, getCarById, getServiceHistory, getManufacturerInfo }}>
      {children}
    </InventoryContext.Provider>
  );
};
