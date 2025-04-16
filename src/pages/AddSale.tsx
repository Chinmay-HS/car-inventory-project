"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast"
import { useCarContext } from "../context/CarContext"
import { useSalesContext } from "../context/SalesContext"

function AddSale() {
  const navigate = useNavigate()
  const { cars } = useCarContext()
  const { addSale } = useSalesContext()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    carId: "",
    saleDate: format(new Date(), "yyyy-MM-dd"),
    salePrice: "",
    customerName: "",
    customerEmail: "",
    paymentMethod: "Cash",
    salesPerson: "",
    notes: "",
  })

  const availableCars = cars.filter((car) => car.status === "Available")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Add the sale to the context
      addSale({
        ...formData,
        salePrice: Number(formData.salePrice),
      })

      toast.success("Sale recorded successfully!")
      navigate("/sales-history")
    } catch (error) {
      toast.error("Failed to record sale. Please try again.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // If car is selected, set default sale price
    if (name === "carId" && value) {
      const selectedCar = cars.find((car) => car.id === value)
      if (selectedCar) {
        setFormData((prev) => ({ ...prev, salePrice: selectedCar.price.toString() }))
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Record New Sale</h1>

      {availableCars.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No available cars to sell</p>
          <button onClick={() => navigate("/add-car")} className="mt-4 text-blue-600 hover:text-blue-700">
            Add a New Car
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Car</label>
              <select
                name="carId"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.carId}
                onChange={handleChange}
              >
                <option value="">Select a car</option>
                {availableCars.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.year} {car.make} {car.model} - ${car.price.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sale Date</label>
              <input
                type="date"
                name="saleDate"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.saleDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sale Price</label>
              <input
                type="number"
                name="salePrice"
                required
                min="0"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.salePrice}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
              <input
                type="text"
                name="customerName"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.customerName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer Email</label>
              <input
                type="email"
                name="customerEmail"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.customerEmail}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <select
                name="paymentMethod"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="Cash">Cash</option>
                <option value="Finance">Finance</option>
                <option value="Lease">Lease</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sales Person</label>
              <input
                type="text"
                name="salesPerson"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.salesPerson}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              name="notes"
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/sales-history")}
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
              <span>{loading ? "Recording Sale..." : "Record Sale"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default AddSale
