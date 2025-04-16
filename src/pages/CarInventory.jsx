import { useInventory } from "../contexts/InventoryContext";
import CarCard from "../components/CarCard";

const CarInventory = () => {
  const { cars } = useInventory();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Car Inventory</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarInventory;
