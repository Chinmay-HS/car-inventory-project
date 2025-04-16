import { NavLink } from "react-router-dom"
import { Car, LayoutDashboard, PlusCircle, Clock, FileText, DollarSign, History, Users } from "lucide-react"

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center space-x-2 text-xl font-bold text-blue-600">
            <Car size={24} />
            <span>CarInventory</span>
          </NavLink>

          <div className="flex items-center space-x-4">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `nav-link flex items-center space-x-1 ${isActive ? "active" : ""}`}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/inventory"
              className={({ isActive }) => `nav-link flex items-center space-x-1 ${isActive ? "active" : ""}`}
            >
              <Car size={18} />
              <span>Inventory</span>
            </NavLink>
            <NavLink
              to="/add-car"
              className={({ isActive }) => `nav-link flex items-center space-x-1 ${isActive ? "active" : ""}`}
            >
              <PlusCircle size={18} />
              <span>Add Car</span>
            </NavLink>
            <NavLink
              to="/add-sale"
              className={({ isActive }) => `nav-link flex items-center space-x-1 ${isActive ? "active" : ""}`}
            >
              <DollarSign size={18} />
              <span>New Sale</span>
            </NavLink>
            <NavLink
              to="/sales-history"
              className={({ isActive }) => `nav-link flex items-center space-x-1 ${isActive ? "active" : ""}`}
            >
              <History size={18} />
              <span>Sales</span>
            </NavLink>
            <NavLink
              to="/sales-people"
              className={({ isActive }) => `nav-link flex items-center space-x-1 ${isActive ? "active" : ""}`}
            >
              <Users size={18} />
              <span>Team</span>
            </NavLink>
            <NavLink
              to="/recently-viewed"
              className={({ isActive }) => `nav-link flex items-center space-x-1 ${isActive ? "active" : ""}`}
            >
              <Clock size={18} />
              <span>Recent</span>
            </NavLink>
            <NavLink
              to="/reports"
              className={({ isActive }) => `nav-link flex items-center space-x-1 ${isActive ? "active" : ""}`}
            >
              <FileText size={18} />
              <span>Reports</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
