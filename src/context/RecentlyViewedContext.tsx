"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Car } from "./CarContext"

type RecentlyViewedContextType = {
  recentlyViewed: Car[]
  addToRecentlyViewed: (car: Car) => void
  clearRecentlyViewed: () => void
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined)

export const useRecentlyViewedContext = () => {
  const context = useContext(RecentlyViewedContext)
  if (!context) {
    throw new Error("useRecentlyViewedContext must be used within a RecentlyViewedProvider")
  }
  return context
}

type RecentlyViewedProviderProps = {
  children: ReactNode
}

export const RecentlyViewedProvider = ({ children }: RecentlyViewedProviderProps) => {
  const [recentlyViewed, setRecentlyViewed] = useState<Car[]>([])

  const addToRecentlyViewed = (car: Car) => {
    // Remove the car if it's already in the list
    const filtered = recentlyViewed.filter((item) => item.id !== car.id)

    // Add the car to the beginning of the list
    setRecentlyViewed([car, ...filtered].slice(0, 10)) // Keep only the 10 most recent
  }

  const clearRecentlyViewed = () => {
    setRecentlyViewed([])
  }

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addToRecentlyViewed, clearRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  )
}
