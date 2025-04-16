"use client"

import { Link } from "react-router-dom"
import { useRecentlyViewedContext } from "../context/RecentlyViewedContext"

function RecentlyViewed() {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewedContext()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Recently Viewed Cars</h1>

        {recentlyViewed.length > 0 && (
          <button
            onClick={clearRecentlyViewed}
            className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
          >
            Clear History
          </button>
        )}
      </div>

      {recentlyViewed.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No recently viewed cars</p>
          <Link to="/inventory" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            Browse Inventory
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentlyViewed.map((car) => (
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

export default RecentlyViewed
