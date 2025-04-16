import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import Inventory from "./pages/Inventory"
import CarDetails from "./pages/CarDetails"
import Home from "./pages/Home"
import AddCar from "./pages/AddCar"
import RecentlyViewed from "./pages/RecentlyViewed"
import Reports from "./pages/Reports"
import AddSale from "./pages/AddSale"
import SalesHistory from "./pages/SalesHistory"
import SalesPeople from "./pages/SalesPeople"
import { CarProvider } from "./context/CarContext"
import { SalesProvider } from "./context/SalesContext"
import { RecentlyViewedProvider } from "./context/RecentlyViewedContext"

function App() {
  return (
    <CarProvider>
      <SalesProvider>
        <RecentlyViewedProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/car/:id" element={<CarDetails />} />
                  <Route path="/add-car" element={<AddCar />} />
                  <Route path="/recently-viewed" element={<RecentlyViewed />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/add-sale" element={<AddSale />} />
                  <Route path="/sales-history" element={<SalesHistory />} />
                  <Route path="/sales-people" element={<SalesPeople />} />
                </Routes>
              </main>
              <Toaster position="top-right" />
            </div>
          </Router>
        </RecentlyViewedProvider>
      </SalesProvider>
    </CarProvider>
  )
}

export default App
