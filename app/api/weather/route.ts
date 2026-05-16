import { NextRequest, NextResponse } from "next/server"
import getGeoResults from "@/lib/getGeoResults"
import getMeteoResults from "@/lib/getMeteoResults"
import getMeteoResultsonDate from "@/lib/getMeteoResultsonDate"

const allowedOrigins = [
  "http://localhost:3000",
  "https://barber-one-psi.vercel.app/",
]

function getCorsHeaders(origin: string | null) {
  const isAllowed = origin && allowedOrigins.includes(origin)

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  }
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin")
  console.log("Received OPTIONS request from origin:", origin)
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  })
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin")
  console.log("Received GET request from origin:", origin)
  const url = new URL(request.url)

  const date = url.searchParams.get("date") as string
  const time = url.searchParams.get("time") as string

  const resRaw = await getGeoResults("Holon")
  console.log(resRaw)

  const { latitude, longitude, name } = resRaw.results[0]

  const lat = latitude.toString()
  const lng = longitude.toString()

  const meteoResOnDate = await getMeteoResultsonDate(
    { latitude: lat, longitude: lng, name },
    date,
    time
  )
  console.log(meteoResOnDate)
  const response = {
    meteoResOnDate,
  }

  return NextResponse.json(response, {
    status: 200,
    headers: getCorsHeaders(origin),
  })
}
