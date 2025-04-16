"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import salesData from "../data/sales.json"
import { useCarContext } from "./CarContext"

export type Sale = {
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

export type SalesMetrics = {
  dailyStats: Record<
    string,
    {
      totalSales: number
      revenue: number
      commissions: number
    }
  >
  monthlyStats: Record<
    string,
    {
      totalSales: number
      revenue: number
      commissions: number
      averagePrice: number
      topSalesPerson: string
    }
  >
  yearlyStats: Record<
    string,
    {
      totalSales: number
      revenue: number
      commissions: number
      averagePrice: number
      bestMonth: string
      topSalesPerson: string
    }
  >
  salesPeople: Record<
    string,
    {
      totalSales: number
      revenue: number
      commissions: number
      averageSalePrice: number
    }
  >
}

type SalesContextType = {
  sales: Sale[]
  salesMetrics: SalesMetrics
  addSale: (sale: Omit<Sale, "id" | "commission">) => void
  getSalesByCar: (carId: string) => Sale[]
}

const SalesContext = createContext<SalesContextType | undefined>(undefined)

export const useSalesContext = () => {
  const context = useContext(SalesContext)
  if (!context) {
    throw new Error("useSalesContext must be used within a SalesProvider")
  }
  return context
}

type SalesProviderProps = {
  children: ReactNode
}

export const SalesProvider = ({ children }: SalesProviderProps) => {
  const [sales, setSales] = useState<Sale[]>(salesData.sales)
  const [salesMetrics, setSalesMetrics] = useState<SalesMetrics>(salesData.salesMetrics)
  const { updateCar } = useCarContext()

  // Update metrics whenever sales change
  useEffect(() => {
    const dailyStats: Record<string, { totalSales: number; revenue: number; commissions: number }> = {}
    const monthlyStats: Record<string, any> = {}
    const yearlyStats: Record<string, any> = {}
    const salesPeople: Record<string, any> = {}

    sales.forEach((sale) => {
      // Daily stats
      const date = sale.saleDate
      if (!dailyStats[date]) {
        dailyStats[date] = { totalSales: 0, revenue: 0, commissions: 0 }
      }
      dailyStats[date].totalSales += 1
      dailyStats[date].revenue += sale.salePrice
      dailyStats[date].commissions += sale.commission

      // Monthly stats
      const month = date.substring(0, 7) // YYYY-MM
      if (!monthlyStats[month]) {
        monthlyStats[month] = { totalSales: 0, revenue: 0, commissions: 0, salesByPerson: {} }
      }
      monthlyStats[month].totalSales += 1
      monthlyStats[month].revenue += sale.salePrice
      monthlyStats[month].commissions += sale.commission

      if (!monthlyStats[month].salesByPerson[sale.salesPerson]) {
        monthlyStats[month].salesByPerson[sale.salesPerson] = 0
      }
      monthlyStats[month].salesByPerson[sale.salesPerson] += 1

      // Yearly stats
      const year = date.substring(0, 4) // YYYY
      if (!yearlyStats[year]) {
        yearlyStats[year] = {
          totalSales: 0,
          revenue: 0,
          commissions: 0,
          salesByMonth: {},
          salesByPerson: {},
        }
      }
      yearlyStats[year].totalSales += 1
      yearlyStats[year].revenue += sale.salePrice
      yearlyStats[year].commissions += sale.commission

      const monthName = new Date(date).toLocaleString("default", { month: "long" })
      if (!yearlyStats[year].salesByMonth[monthName]) {
        yearlyStats[year].salesByMonth[monthName] = 0
      }
      yearlyStats[year].salesByMonth[monthName] += 1

      if (!yearlyStats[year].salesByPerson[sale.salesPerson]) {
        yearlyStats[year].salesByPerson[sale.salesPerson] = 0
      }
      yearlyStats[year].salesByPerson[sale.salesPerson] += 1

      // Sales people stats
      if (!salesPeople[sale.salesPerson]) {
        salesPeople[sale.salesPerson] = { totalSales: 0, revenue: 0, commissions: 0 }
      }
      salesPeople[sale.salesPerson].totalSales += 1
      salesPeople[sale.salesPerson].revenue += sale.salePrice
      salesPeople[sale.salesPerson].commissions += sale.commission
    })

    // Calculate averages and find top performers
    Object.keys(monthlyStats).forEach((month) => {
      monthlyStats[month].averagePrice =
        monthlyStats[month].totalSales > 0 ? monthlyStats[month].revenue / monthlyStats[month].totalSales : 0

      let topPerson = ""
      let topSales = 0
      Object.entries(monthlyStats[month].salesByPerson).forEach(([person, sales]) => {
        if (sales > topSales) {
          topPerson = person
          topSales = sales as number
        }
      })
      monthlyStats[month].topSalesPerson = topPerson
    })

    Object.keys(yearlyStats).forEach((year) => {
      yearlyStats[year].averagePrice =
        yearlyStats[year].totalSales > 0 ? yearlyStats[year].revenue / yearlyStats[year].totalSales : 0

      let bestMonth = ""
      let bestMonthSales = 0
      Object.entries(yearlyStats[year].salesByMonth).forEach(([month, sales]) => {
        if (sales > bestMonthSales) {
          bestMonth = month
          bestMonthSales = sales as number
        }
      })
      yearlyStats[year].bestMonth = bestMonth

      let topPerson = ""
      let topSales = 0
      Object.entries(yearlyStats[year].salesByPerson).forEach(([person, sales]) => {
        if (sales > topSales) {
          topPerson = person
          topSales = sales as number
        }
      })
      yearlyStats[year].topSalesPerson = topPerson
    })

    Object.keys(salesPeople).forEach((person) => {
      salesPeople[person].averageSalePrice =
        salesPeople[person].totalSales > 0 ? salesPeople[person].revenue / salesPeople[person].totalSales : 0
    })

    setSalesMetrics({
      dailyStats,
      monthlyStats,
      yearlyStats,
      salesPeople,
    })
  }, [sales])

  const addSale = (sale: Omit<Sale, "id" | "commission">) => {
    // Calculate commission (3% of sale price)
    const commission = Number(sale.salePrice) * 0.03

    const newSale: Sale = {
      ...sale,
      id: (sales.length + 1).toString(),
      commission,
    }

    setSales([...sales, newSale])

    // Update car status to sold
    updateCar(sale.carId, { status: "Sold" })
  }

  const getSalesByCar = (carId: string) => {
    return sales.filter((sale) => sale.carId === carId)
  }

  return (
    <SalesContext.Provider value={{ sales, salesMetrics, addSale, getSalesByCar }}>{children}</SalesContext.Provider>
  )
}
