"use client"
import { createContext, useContext, useState } from "react"

type DataContextType = {
  user: string
  setUser: React.Dispatch<React.SetStateAction<string>>
  count: number
  setCount: React.Dispatch<React.SetStateAction<number>>
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  isLoggedin: string
  setIsLoggedin: React.Dispatch<React.SetStateAction<string>>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(100)
  const [search, setSearch] = useState("catergory")
   const [isLoggedin, setIsLoggedin] = useState<string>("true")
   const [user, setUser] = useState('Guest')
  return (
    <DataContext.Provider value={{ user, setUser, count, setCount, search, setSearch, isLoggedin, setIsLoggedin }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useData must be used within DataProvider")
  }
  return context
}
