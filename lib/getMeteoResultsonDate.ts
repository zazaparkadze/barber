export default async function getMeteoResults(
  searchObject: SearchObject,
  date: string,
  time: string
) {
  const forecast_days = "7"
  const searchParams = new URLSearchParams(searchObject)
  searchParams.append(
    "hourly",
    "temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation_probability,"
  )
  searchParams.append(
    "current",
    "temperature_2m,wind_speed_10m,relative_humidity_2m,precipitation_probability"
  )
  searchParams.append("forecast_days", forecast_days)

  const url = "https://api.open-meteo.com/v1/forecast?" + searchParams
  const res = await fetch(url)

  const data: MeteoResult = await res.json()
  // Extract the hourly data for the specified date and time
  const hourlyData = data.hourly
  const timeHours = Number(time.split(":")[0])

  const timeIndex = hourlyData.time.findIndex((t: string) => t === `${date}T${
    timeHours.toString().length === 1 ? `0${timeHours}` : timeHours}:00`)
   
  console.log(data)

  if (timeIndex === -1) {
    const result = {
      temperature_2m: "no data",
      relative_humidity_2m: "no data",
      wind_speed_10m: "no data",
      precipitation_probability: "no data",
      current_units: data.current_units,
    }
    return result
  }

  const result = {
    temperature_2m: hourlyData.temperature_2m[timeIndex],
    relative_humidity_2m: hourlyData.relative_humidity_2m[timeIndex],
    wind_speed_10m: hourlyData.wind_speed_10m[timeIndex],
    precipitation_probability: hourlyData.precipitation_probability[timeIndex],
    current_units: data.current_units,
  }

  return result
}
