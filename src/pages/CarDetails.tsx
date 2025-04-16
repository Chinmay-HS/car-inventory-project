"use client"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Info, MapPin, Fuel, Settings, Check } from "lucide-react"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useCarContext } from "../context/CarContext"
import { useRecentlyViewedContext } from "../context/RecentlyViewedContext"

function CarDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getCar, reserveCar } = useCarContext()
  const { addToRecentlyViewed } = useRecentlyViewedContext()

  const car = getCar(id || "")

  useEffect(() => {
    if (car) {
      addToRecentlyViewed(car)
    }
  }, [car, addToRecentlyViewed])

  if (!car) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">Car not found</h2>
        <button onClick={() => navigate("/inventory")} className="mt-4 text-blue-600 hover:text-blue-700">
          Back to Inventory
        </button>
      </div>
    )
  }

  const handleReserve = () => {
    reserveCar(car.id)
    toast.success("Car reserved successfully!")
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/inventory")}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft size={20} />
        <span>Back to Inventory</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <img
            src={car.image || "/placeholder.svg"}
            alt={`${car.make} ${car.model}`}
            className="w-full h-[400px] object-cover rounded-xl"
          />

          <div className="card space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Features</h2>
            <div className="grid grid-cols-2 gap-4">
              {car.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Check size={18} className="text-green-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {car.make} {car.model} {car.year}
            </h1>
            <p className="text-2xl font-bold text-blue-600 mb-4">${car.price.toLocaleString()}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Info size={20} className="text-gray-400" />
                <span>VIN: {car.vin}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={20} className="text-gray-400" />
                <span>{car.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Fuel size={20} className="text-gray-400" />
                <span>{car.fuelType}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Settings size={20} className="text-gray-400" />
                <span>{car.transmission}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Vehicle Status</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    car.status === "Available"
                      ? "bg-green-100 text-green-800"
                      : car.status === "Reserved"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {car.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Mileage</span>
                <span>{car.mileage.toLocaleString()} miles</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Color</span>
                <span>{car.color}</span>
              </div>
            </div>
          </div>

          {car.status === "Available" && (
            <button
              onClick={handleReserve}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reserve Now
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CarDetails
