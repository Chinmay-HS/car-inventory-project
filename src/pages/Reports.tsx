import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { useCarContext } from "../context/CarContext"
import { useSalesContext } from "../context/SalesContext"

function Reports() {
  const { statistics } = useCarContext()
  const { sales, salesMetrics } = useSalesContext()

  // Create monthly sales data
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const currentYear = new Date().getFullYear().toString()

  const salesData = monthNames.map((month, index) => {
    const monthKey = `${currentYear}-${(index + 1).toString().padStart(2, "0")}`
    const monthStats = salesMetrics.monthlyStats[monthKey] || { totalSales: 0, revenue: 0 }

    return {
      name: month,
      sales: monthStats.totalSales,
      revenue: monthStats.revenue,
    }
  })

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Sales</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Revenue Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Inventory Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Value</p>
            <p className="text-2xl font-bold text-gray-800">${statistics.totalValue.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Average Price</p>
            <p className="text-2xl font-bold text-gray-800">${statistics.averagePrice.toLocaleString()}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Cars</p>
            <p className="text-2xl font-bold text-gray-800">{statistics.totalCars}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Sales Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Sales</p>
            <p className="text-2xl font-bold text-gray-800">{sales.length}</p>
          </div>
          <div className="bg-pink-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-800">
              ${sales.reduce((sum, sale) => sum + sale.salePrice, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Commissions</p>
            <p className="text-2xl font-bold text-gray-800">
              ${sales.reduce((sum, sale) => sum + sale.commission, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
