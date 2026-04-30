import { fetchWeatherApi } from "openmeteo";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  const params = {
    latitude: Number(lat),
    longitude: Number(lon),
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
      "precipitation_probability_max",
      "weather_code",
      "sunrise",
      "sunset",
    ],
    timezone: "auto",
    forecast_days: 16,
  };

  const url = "https://api.open-meteo.com/v1/forecast";

  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];

  const daily = response.daily();
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const result = {
    time: Array.from(
      {
        length:
          (Number(daily.timeEnd()) - Number(daily.time())) /
          daily.interval(),
      },
      (_, i) =>
        new Date(
          (Number(daily.time()) +
            i * daily.interval() +
            utcOffsetSeconds) *
            1000
        ).toISOString()
    ),

    maxTemp: daily.variables(0).valuesArray(),
    minTemp: daily.variables(1).valuesArray(),
    precipitation: daily.variables(2).valuesArray(),

    precipitationProbability: daily.variables(3).valuesArray(),
    weatherCode: daily.variables(4).valuesArray(),

    sunrise: daily.variables(5).valuesArray(),
    sunset: daily.variables(6).valuesArray(),
  };

  return Response.json(result);
}