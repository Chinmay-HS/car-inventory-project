"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Filter } from "lucide-react"
import { useCarContext } from "../context/CarContext"

function Inventory() {
  const { cars } = useCarContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || car.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Car Inventory</h1>

        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search cars..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              className="py-2 px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </div>
      </div>

      {filteredCars.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No cars found matching your criteria</p>
          <Link to="/add-car" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            Add a New Car
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Link to={`/car/${car.id}`} key={car.id} className="card">
              <img
                src={car.image || "/placeholder.svg"}
                alt={`${car.make} ${car.model}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-gray-800">
                  {car.make} {car.model}
                </h2>
                <p className="text-gray-600">
                  {car.year} • {car.mileage.toLocaleString()} miles
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-bold text-blue-600">${car.price.toLocaleString()}</p>
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
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Inventory
