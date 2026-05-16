export default async function getMeteoResults(searchObject: SearchObject) {
  const forecast_days = "1";
  const searchParams = new URLSearchParams(searchObject);
  searchParams.append(
    "hourly",
    "temperature_2m,relative_humidity_2m,wind_speed_10m"
  );
  searchParams.append("current", "temperature_2m,wind_speed_10m");
  searchParams.append("forecast_days", forecast_days);

  const url = "https://api.open-meteo.com/v1/forecast?" + searchParams;
  const res = await fetch(url);
  
  return res.json();
}


  