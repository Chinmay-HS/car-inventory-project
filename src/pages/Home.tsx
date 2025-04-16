import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000"
          alt="Luxury Car"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-white text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to CarInventory</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Discover our extensive collection of premium vehicles. From classic cars to modern luxury, find your perfect
          match.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/inventory"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <span>Browse Inventory</span>
            <ArrowRight size={20} />
          </Link>
          <Link
            to="/add-car"
            className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-lg transition-colors"
          >
            Add New Car
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
