import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; time?: string }>
}) {
  const { date, time } = await searchParams

  const fetchUrl =
    process.env.NODE_ENV === "production"
      ? `https://barber-one-psi.vercel.app/api/weather?date=${date}&time=${time}`
      : `http://localhost:3000/api/weather?date=${date}&time=${time}`

  const result = await fetch(fetchUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  //console.log(time, date)
  const meteoData = await result.json()
 // console.log(meteoData)

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-green-900/90">
      <div className="flex h-fit max-w-4xl flex-col items-center justify-center gap-10 rounded-lg border border-green-400 bg-green-950 p-10 text-green-400">
        <div className="text-3xl">Weather Forecast</div>
        <div className="flex flex-col items-center justify-center">
          Weather forcast for {date} at {time}{" "}
          <span>
            Temperature: {meteoData.meteoResOnDate.temperature_2m}{" "}
            {meteoData.meteoResOnDate.current_units.temperature_2m}
          </span>
          <span>
            Wind: {meteoData.meteoResOnDate.wind_speed_10m}{" "}
            {meteoData.meteoResOnDate.current_units.wind_speed_10m}
          </span>
          <span>
            Relative Humidity: {meteoData.meteoResOnDate.relative_humidity_2m}{" "}
            {meteoData.meteoResOnDate.current_units.relative_humidity_2m}{" "}
          </span>
          <span>
            Precipitation Probability:{" "}
            {meteoData.meteoResOnDate.precipitation_probability}{" "}
            {
              meteoData.meteoResOnDate.current_units.precipitation_probability
            }{" "}
          </span>
        </div>
        <Button
          asChild
          size="lg"
          className="w-full bg-amber-400 text-slate-950 hover:bg-amber-300 disabled:opacity-50"
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
          </Link>
        </Button>
        <Link
          href="/reserve"
          className="mt-4 text-sm text-green-300 hover:underline"
        >
          <Button className="mt-4 bg-green-400 text-slate-950 hover:bg-green-300">
            Make another appointment
          </Button>
        </Link>
      </div>
    </div>
  )
}
