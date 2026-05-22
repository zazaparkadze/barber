"use client"
import { useState, useEffect } from "react"
import Image from "next/image"

export function Chanels() {
  const [myInfo, setMyInfo] = useState<
    { chanels: string; origin: string } | "...loading"
  >("...loading")

  useEffect(() => {
    const fetchPrivateInfo = async () => {
      const response = await fetch("/api/chanels/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()

      if (response.status === 200) {
        setMyInfo(data)
        return
      }
      setMyInfo({
        chanels: "server message",
        origin: "You are not allowed to view this content",
      })
    }

    fetchPrivateInfo()
  }, [])

  return myInfo === "...loading" ? (
    <p>...loading</p>
  ) : (
    <ul>
      {Object.entries(myInfo!).map(([prop, value], index) => (
        <li key={index}>
          {prop}: {" "}<span className="italic text-amber-100">{value}</span>
        </li>
      ))}
    </ul>
  )
}

export default function page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-900 text-2xl text-amber-500">
      <p className="uppercase underline">Secret Page</p>
      <Chanels />
      <Image
        src={"/images/men/image-2.jpg"}
        height={1024 / 3}
        width={768 / 3}
        alt="zaza"
        loading={"eager"}
      />
    </div>
  )
}
