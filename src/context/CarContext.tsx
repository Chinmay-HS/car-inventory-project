"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import carData from "../data/cars.json"

export type Car = {
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

export type CarStatistics = {
  totalCars: number
  availableCars: number
  reservedCars: number
  totalValue: number
  averagePrice: number
  popularMakes: string[]
  popularColors: string[]
  salesData: {
    lastMonth: {
      total: number
      revenue: number
    }
    thisMonth: {
      total: number
      revenue: number
    }
  }
  inventoryTrends: {
    newArrivals: number
    reserved: number
    sold: number
  }
}

type CarContextType = {
  cars: Car[]
  statistics: CarStatistics
  addCar: (car: Omit<Car, "id" | "addedDate" | "lastModified">) => void
  updateCar: (id: string, updates: Partial<Car>) => void
  reserveCar: (id: string) => void
  deleteCar: (id: string) => void
  getCar: (id: string) => Car | undefined
}

const CarContext = createContext<CarContextType | undefined>(undefined)

export const useCarContext = () => {
  const context = useContext(CarContext)
  if (!context) {
    throw new Error("useCarContext must be used within a CarProvider")
  }
  return context
}

type CarProviderProps = {
  children: ReactNode
}

export const CarProvider = ({ children }: CarProviderProps) => {
  const [cars, setCars] = useState<Car[]>(carData.cars)
  const [statistics, setStatistics] = useState<CarStatistics>(carData.statistics)

  // Update statistics whenever cars change
  useEffect(() => {
    const availableCars = cars.filter((car) => car.status === "Available").length
    const reservedCars = cars.filter((car) => car.status === "Reserved").length
    const totalValue = cars.reduce((sum, car) => sum + car.price, 0)
    const averagePrice = cars.length > 0 ? totalValue / cars.length : 0

    const makes = cars.map((car) => car.make)
    const popularMakes = [...new Set(makes)]

    const colors = cars.map((car) => car.color)
    const popularColors = [...new Set(colors)]

    setStatistics({
      ...statistics,
      totalCars: cars.length,
      availableCars,
      reservedCars,
      totalValue,
      averagePrice,
      popularMakes,
      popularColors,
      inventoryTrends: {
        ...statistics.inventoryTrends,
        newArrivals: cars.filter((car) => {
          const addedDate = new Date(car.addedDate)
          const thirtyDaysAgo = new Date()
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
          return addedDate >= thirtyDaysAgo
        }).length,
      },
    })
  }, [cars])

  const addCar = (car: Omit<Car, "id" | "addedDate" | "lastModified">) => {
    const newCar: Car = {
      ...car,
      id: (cars.length + 1).toString(),
      addedDate: new Date().toISOString().split("T")[0],
      lastModified: new Date().toISOString().split("T")[0],
    }

    setCars([...cars, newCar])
  }

  const updateCar = (id: string, updates: Partial<Car>) => {
    setCars(
      cars.map((car) =>
        car.id === id ? { ...car, ...updates, lastModified: new Date().toISOString().split("T")[0] } : car,
      ),
    )
  }

  const reserveCar = (id: string) => {
    updateCar(id, { status: "Reserved" })
  }

  const deleteCar = (id: string) => {
    setCars(cars.filter((car) => car.id !== id))
  }

  const getCar = (id: string) => {
    return cars.find((car) => car.id === id)
  }

  return (
    <CarContext.Provider value={{ cars, statistics, addCar, updateCar, reserveCar, deleteCar, getCar }}>
      {children}
    </CarContext.Provider>
  )
}
