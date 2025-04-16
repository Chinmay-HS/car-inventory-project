"use client"

import { useState } from "react"
import { format, parseISO } from "date-fns"
import { Search, Filter } from "lucide-react"
import { useSalesContext } from "../context/SalesContext"
import { useCarContext } from "../context/CarContext"

function SalesHistory() {
  const { sales } = useSalesContext()
  const { getCar } = useCarContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("all")

  const filteredSales = sales.filter((sale) => {
    const matchesSearch =
      sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.salesPerson.toLowerCase().includes(searchTerm.toLowerCase())

    let matchesDate = true
    const saleDate = parseISO(sale.saleDate)
    const today = new Date()
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30))

    if (dateFilter === "last30") {
      matchesDate = saleDate >= thirtyDaysAgo
    } else if (dateFilter === "thisMonth") {
      matchesDate = saleDate.getMonth() === new Date().getMonth() && saleDate.getFullYear() === new Date().getFullYear()
    }

    return matchesSearch && matchesDate
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Sales History</h1>

        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search sales..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              className="py-2 px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="last30">Last 30 Days</option>
              <option value="thisMonth">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {filteredSales.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No sales found matching your criteria</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales Person
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commission
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSales.map((sale) => {
                const car = getCar(sale.carId)
                return (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(parseISO(sale.saleDate), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{sale.customerName}</div>
                      <div className="text-sm text-gray-500">{sale.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {car ? `${car.year} ${car.make} ${car.model}` : "Unknown Car"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.salesPerson}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${sale.salePrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${sale.commission.toLocaleString()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default SalesHistory
