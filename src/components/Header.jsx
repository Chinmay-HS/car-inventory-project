import React from 'react';

function Header() {
  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Car Inventory System</h1>
        <div className="space-x-4">
          <span className="hidden md:inline">Manage your car inventory with ease</span>
        </div>
      </div>
    </header>
  );
}

export default Header;