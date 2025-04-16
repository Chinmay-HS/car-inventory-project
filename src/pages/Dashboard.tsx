import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Car, DollarSign, AlertCircle } from "lucide-react"
import { useCarContext } from "../context/CarContext"
import { useSalesContext } from "../context/SalesContext"

function Dashboard() {
  const { statistics } = useCarContext()
  const { salesMetrics } = useSalesContext()

  // Get current year and month
  const currentYear = new Date().getFullYear().toString()
  const currentMonth = new Date().toISOString().substring(0, 7) // YYYY-MM

  // Get sales data for current month and year
  const thisMonthSales = salesMetrics.monthlyStats[currentMonth]?.totalSales || 0
  const thisMonthRevenue = salesMetrics.monthlyStats[currentMonth]?.revenue || 0

  // Create data for make chart
  const makeData = statistics.popularMakes.map((make) => ({
    name: make,
    count: 1, // This would be calculated from actual data in a real app
  }))

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-blue-50">
          <div className="flex items-center space-x-4">
            <Car className="text-blue-600" size={24} />
            <div>
              <p className="text-sm text-gray-600">Total Cars</p>
              <p className="text-2xl font-bold text-gray-800">{statistics.totalCars}</p>
            </div>
          </div>
        </div>

        <div className="card bg-green-50">
          <div className="flex items-center space-x-4">
            <DollarSign className="text-green-600" size={24} />
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-800">${statistics.totalValue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card bg-yellow-50">
          <div className="flex items-center space-x-4">
            <AlertCircle className="text-yellow-600" size={24} />
            <div>
              <p className="text-sm text-gray-600">Reserved Cars</p>
              <p className="text-2xl font-bold text-gray-800">{statistics.reservedCars}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Popular Makes</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={makeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Sales This Month</h2>
          <div className="flex flex-col items-center justify-center h-32">
            <p className="text-4xl font-bold text-blue-600">{thisMonthSales}</p>
            <p className="text-gray-600">Total Sales</p>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Revenue This Month</h2>
          <div className="flex flex-col items-center justify-center h-32">
            <p className="text-4xl font-bold text-green-600">${thisMonthRevenue.toLocaleString()}</p>
            <p className="text-gray-600">Total Revenue</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
