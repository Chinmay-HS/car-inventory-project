### Mini Car Inventory System

## Overview

The Car Inventory Management System is a comprehensive web application designed for car dealerships to manage their vehicle inventory, track sales, and generate analytical reports. This application provides a centralized platform for dealership staff to add new vehicles, update existing inventory, record sales transactions, and monitor performance metrics.

## Features

### Inventory Management

- **Vehicle Catalog**: Browse and search through the complete inventory
- **Detailed Vehicle Information**: Access comprehensive details including specifications, features, and pricing
- **Inventory Filtering**: Filter vehicles by status (Available, Reserved, Sold)
- **Add New Vehicles**: Input detailed information for new inventory additions
- **Vehicle Reservation**: Mark vehicles as reserved for potential customers


### Sales Management

- **Sales Recording**: Document complete sales transactions
- **Customer Information**: Track customer details for each sale
- **Commission Calculation**: Automatic calculation of sales commissions (3% of sale price)
- **Payment Method Tracking**: Record different payment methods (Cash, Finance, Lease, Bank Transfer)
- **Sales History**: View and filter complete sales transaction history


### Analytics and Reporting

- **Dashboard Overview**: Visual summary of key metrics
- **Sales Performance**: Track sales volume and revenue over time
- **Inventory Valuation**: Monitor total and average inventory value
- **Sales Team Performance**: Analyze individual salesperson performance
- **Monthly and Yearly Reports**: View aggregated data by time period


### Additional Features

- **Recently Viewed**: Track and display recently viewed vehicles
- **User-Friendly Interface**: Intuitive navigation and responsive design
- **Real-Time Updates**: Dynamic data updates across all sections of the application


## Technical Architecture

The application is built using a component-based architecture with React and implements the Context API for state management. The main architectural components include:

### Context Providers

- **CarContext**: Manages the vehicle inventory state and operations
- **SalesContext**: Handles sales data and metrics calculations
- **RecentlyViewedContext**: Tracks user browsing history


### State Management

The application uses React's Context API to manage application state, allowing for:

- Centralized data storage
- Cross-component communication
- Reactive UI updates
- Calculated statistics and metrics


### Data Flow

1. User actions trigger context methods
2. Context methods update the relevant state
3. Components consuming the context re-render with updated data
4. Statistics and metrics are automatically recalculated


## Installation and Setup

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)


### Installation Steps

1. Clone the repository:

```shellscript
git clone https://github.com/yourusername/car-inventory-system.git
cd car-inventory-system
```


2. Install dependencies:

```shellscript
npm install
```


3. Start the development server:

```shellscript
npm run dev
```


4. Open your browser and navigate to:

```plaintext
http://localhost:5173
```




## Usage Guide

### Adding a New Car

1. Navigate to the "Add Car" page from the navigation bar
2. Fill in all required vehicle information
3. Click "Add Car" to save the new vehicle to inventory
4. The new vehicle will appear in the inventory list


### Recording a Sale

1. Navigate to the "New Sale" page from the navigation bar
2. Select an available vehicle from the dropdown
3. Enter the sale date, customer information, and payment details
4. Click "Record Sale" to complete the transaction
5. The vehicle status will automatically change to "Sold"


### Reserving a Vehicle

1. Navigate to the vehicle details page by clicking on a vehicle in the inventory
2. If the vehicle is available, click the "Reserve Now" button
3. The vehicle status will change to "Reserved"


### Viewing Reports

1. Navigate to the "Reports" page from the navigation bar
2. View various charts and statistics about inventory and sales
3. Use this data to make informed business decisions


### Managing Recently Viewed

1. As you browse vehicle details, they are automatically added to your recently viewed list
2. Navigate to the "Recent" page to see your browsing history
3. Click "Clear History" to reset the list


## Project Structure

```plaintext
src/
├── components/         # Reusable UI components
│   └── Navbar.tsx      # Navigation component
├── context/            # Context providers for state management
│   ├── CarContext.tsx  # Vehicle inventory state management
│   ├── SalesContext.tsx # Sales data management
│   └── RecentlyViewedContext.tsx # Browsing history tracking
├── data/               # Initial data files
│   ├── cars.json       # Seed data for vehicles
│   ├── sales.json      # Seed data for sales
│   └── recentlyViewed.json # Empty initial recently viewed data
├── pages/              # Application pages
│   ├── AddCar.tsx      # Form for adding new vehicles
│   ├── AddSale.tsx     # Form for recording sales
│   ├── CarDetails.tsx  # Detailed vehicle information
│   ├── Dashboard.tsx   # Overview and key metrics
│   ├── Home.tsx        # Landing page
│   ├── Inventory.tsx   # Vehicle listing and filtering
│   ├── RecentlyViewed.tsx # Recently viewed vehicles
│   ├── Reports.tsx     # Detailed analytics and charts
│   ├── SalesHistory.tsx # Sales transaction history
│   └── SalesPeople.tsx # Sales team performance
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Technologies Used

### Frontend

- **React**: UI library for building component-based interfaces
- **React Router**: For navigation and routing
- **React Context API**: For state management
- **TypeScript**: For type safety and improved developer experience
- **Tailwind CSS**: For styling and responsive design


### Visualization

- **Recharts**: For data visualization and charts


### Development Tools

- **Vite**: For fast development and building
- **ESLint**: For code linting
- **date-fns**: For date manipulation and formatting


## Data Models

### Car Model

```typescript
type Car = {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  color: string
  fuelType: string
  transmission: string
  status: "Available" | "Reserved" | "Sold"
  features: string[]
  specifications: {
    engine: string
    horsepower: string
    torque: string
    fuelEconomy: {
      city: string
      highway: string
    }
    dimensions: {
      length: string
      width: string
      height: string
      wheelbase: string
    }
    weight: string
    cargo: string
  }
  maintenance: {
    lastService: string
    nextService: string
    serviceHistory: any[]
  }
  warranty: {
    basic: string
    powertrain: string
    hybrid: string
  }
  image: string
  gallery: string[]
  location: string
  vin: string
  addedDate: string
  lastModified: string
}
```

### Sale Model

```typescript
type Sale = {
  id: string
  carId: string
  saleDate: string
  salePrice: number
  customerName: string
  customerEmail: string
  paymentMethod: string
  salesPerson: string
  commission: number
  notes: string
}
```

## Limitations and Future Improvements

### Current Limitations

- Data persistence is limited to the current session
- No user authentication or role-based access control
- Limited printing and export capabilities for reports
- No integration with external systems (CRM, accounting)


### Planned Improvements

1. **Data Persistence**: Implement localStorage or backend database integration
2. **User Authentication**: Add login system with role-based permissions
3. **Advanced Filtering**: Enhance search and filtering capabilities
4. **Vehicle Editing**: Add functionality to edit existing vehicle details
5. **PDF Generation**: Enable exporting reports and invoices as PDF
6. **Image Gallery**: Support multiple images per vehicle
7. **Customer Management**: Expand customer tracking and relationship features
8. **Inventory Alerts**: Implement notifications for low inventory or aging vehicles
9. **Mobile Application**: Develop companion mobile app for on-the-go access
10. **API Integration**: Connect with external services for pricing data and market analysis


## Contributing

Contributions to improve the Car Inventory Management System are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project was created as a demonstration of React state management using Context API
- Design inspired by modern inventory management systems
- Thanks to SE COMP C 65 - Jaitej Singh, 67 - Zayed Shaikh, 68 - Karan Sharma