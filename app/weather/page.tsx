export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; time?: string }>
}) {
  const { date, time } = await searchParams
  console.log("searchparams:", date, time)

//process.env.NODE_ENV === "production" && console.log("Running in production mode")

  const fetchUrl = process.env.NODE_ENV === "production"
    ? `https://barber-one-psi.vercel.app/api/weather?date=${date}&time=${time}`
    : `http://localhost:3000/api/weather?date=${date}&time=${time}`
  const result = await fetch(fetchUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  console.log("fetch result:", result)
  const data = await result.json()
  console.log("data:", data)

  return (
    <div>
      <div>Weather Forecast</div>

      <div>{data.forecast}</div>
    </div>
  )
}
