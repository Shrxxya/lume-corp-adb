import { fetchWeatherApi } from "openmeteo";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const url = new URL("https://api.open-meteo.com/v1/forecast");

    url.searchParams.set("latitude", lat);
    url.searchParams.set("longitude", lon);
    url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min");
    url.searchParams.set("forecast_days", "16");
    url.searchParams.set("timezone", "auto");

    const res = await fetch(url.toString());

    console.log("status", res.status);

    const data = await res.json();

    // 👉 normalize for your frontend
    const daily = data.daily;

    const result = {
      time: daily.time,
      maxTemp: daily.temperature_2m_max,
      minTemp: daily.temperature_2m_min,
    };

    return Response.json(result);
  } catch (e) {
    console.error("WEATHER ERROR", e);

    return Response.json(
      {
        error: e.message,
        cause: e.cause?.code,
      },
      { status: 500 }
    );
  }
}