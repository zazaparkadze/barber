"use client"
import { createContext, useContext, useState } from "react"

type DataContextType = {
  username: string
  setUsername: React.Dispatch<React.SetStateAction<string>>
  count: number
  setCount: React.Dispatch<React.SetStateAction<number>>
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  isLoggedin: string
  setIsLoggedin: React.Dispatch<React.SetStateAction<string>>
  success: boolean
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(100)
  const [search, setSearch] = useState("catergory")
  const [isLoggedin, setIsLoggedin] = useState<string>("true")
  const [success, setSuccess] = useState(false)
  const [username, setUsername] = useState("Guest")
  return (
    <DataContext.Provider
      value={{
        username,
        setUsername,
        count,
        setCount,
        search,
        setSearch,
        isLoggedin,
        setIsLoggedin,
        success,
        setSuccess,
      }}
    >
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
