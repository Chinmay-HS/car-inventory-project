"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast"
import { useCarContext } from "../context/CarContext"

function AddCar() {
  const navigate = useNavigate()
  const { addCar } = useCarContext()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    price: "",
    mileage: "",
    color: "",
    fuelType: "Gasoline",
    transmission: "Automatic",
    status: "Available" as "Available" | "Reserved" | "Sold",
    features: ["Bluetooth", "Backup Camera"] as string[],
    specifications: {
      engine: "2.5L 4-Cylinder",
      horsepower: "200 hp",
      torque: "180 lb-ft",
      fuelEconomy: {
        city: "25 mpg",
        highway: "32 mpg",
      },
      dimensions: {
        length: "190 inches",
        width: "72 inches",
        height: "58 inches",
        wheelbase: "110 inches",
      },
      weight: "3,500 lbs",
      cargo: "15 cubic feet",
    },
    maintenance: {
      lastService: new Date().toISOString().split("T")[0],
      nextService: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split("T")[0],
      serviceHistory: [],
    },
    warranty: {
      basic: "36 months/36,000 miles",
      powertrain: "60 months/60,000 miles",
      hybrid: "96 months/100,000 miles",
    },
    image: "",
    gallery: [] as string[],
    vin: "",
    location: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create gallery from the main image
      const gallery = formData.image ? [formData.image] : []

      // Convert string values to numbers
      const numericPrice = Number(formData.price)
      const numericMileage = Number(formData.mileage)

      // Add the car to the context
      addCar({
        ...formData,
        price: numericPrice,
        mileage: numericMileage,
        gallery,
      })

      toast.success("Car added successfully!")
      navigate("/inventory")
    } catch (error) {
      toast.error("Failed to add car. Please try again.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Handle nested properties
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Car</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
            <input
              type="text"
              name="make"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.make}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
            <input
              type="text"
              name="model"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.model}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
            <input
              type="number"
              name="year"
              required
              min="1900"
              max={new Date().getFullYear() + 1}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.year}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input
              type="number"
              name="price"
              required
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mileage</label>
            <input
              type="number"
              name="mileage"
              required
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.mileage}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
            <input
              type="text"
              name="color"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.color}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
            <select
              name="fuelType"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.fuelType}
              onChange={handleChange}
            >
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
            <select
              name="transmission"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.transmission}
              onChange={handleChange}
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="CVT">CVT</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">VIN</label>
            <input
              type="text"
              name="vin"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.vin}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              name="location"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
          <input
            type="url"
            name="image"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/inventory")}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            {loading && <Loader2 size={20} className="animate-spin" />}
            <span>{loading ? "Adding Car..." : "Add Car"}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCar
