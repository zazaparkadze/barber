"use client"
import { useState, useEffect } from "react"

export function Chanels() {
  const [myInfo, setMyInfo] = useState<{ chanels: string[]; origin: string }>()

  useEffect(() => {
    const fetchPrivateInfo = async () => {
      const response = await fetch("/api/chanels/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      console.log(data)
      if (response.status === 200) {
        console.log(response.status)
        setMyInfo(data)
        return
      }
      setMyInfo({
        chanels: ["server message"],
        origin: "You are not allowed to view this content",
      })
    }

    fetchPrivateInfo()
  }, [])

  return (
    <p>
      {myInfo?.chanels!} .... {myInfo?.origin!}
    </p>
  )
}

export default function page() {
  return (
    <div className="bg-slate-900">
      <p>Secret Page</p>
      <Chanels />
    </div>
  )
}
