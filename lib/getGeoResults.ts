export default async function getGeoResults(name: string) {
  const paramsObj = {
    name: name,
    count: "1",
    format: "json",
    language: "en",
    apikey: "",
  };
  const searchParams = new URLSearchParams(paramsObj);
  const res = await fetch(
    "https://geocoding-api.open-meteo.com/v1/search?" + searchParams
  );

  return res.json();
}