export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return Response.json(
        { error: "Missing lat/lon" },
        { status: 400 }
      );
    }

    const url = new URL("https://api.open-meteo.com/v1/forecast");

    url.searchParams.set("latitude", lat);
    url.searchParams.set("longitude", lon);
    url.searchParams.set(
      "daily",
      [
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_sum",
        "precipitation_probability_max",
        "weather_code",
      ].join(",")
    );

    url.searchParams.set("forecast_days", "16");
    url.searchParams.set("timezone", "auto");

    const res = await fetch(url.toString());

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch weather data" },
        { status: 502 }
      );
    }

    const data = await res.json();

    const daily = data?.daily ?? {};

    // 🛡 SAFE NORMALIZATION (prevents frontend crashes)
    const time = Array.isArray(daily.time) ? daily.time : [];
    const maxTemp = Array.isArray(daily.temperature_2m_max)
      ? daily.temperature_2m_max
      : [];
    const minTemp = Array.isArray(daily.temperature_2m_min)
      ? daily.temperature_2m_min
      : [];
    const precipitation = Array.isArray(daily.precipitation_sum)
      ? daily.precipitation_sum
      : [];
    const precipitationProbability = Array.isArray(
      daily.precipitation_probability_max
    )
      ? daily.precipitation_probability_max
      : [];
    const weatherCode = Array.isArray(daily.weather_code)
      ? daily.weather_code
      : [];

    // 🧼 ensure all arrays are same length
    const length = Math.min(
      time.length,
      maxTemp.length,
      minTemp.length,
      precipitation.length,
      precipitationProbability.length,
      weatherCode.length
    );

    return Response.json({
      time: time.slice(0, length),
      maxTemp: maxTemp.slice(0, length),
      minTemp: minTemp.slice(0, length),
      precipitation: precipitation.slice(0, length),
      precipitationProbability: precipitationProbability.slice(0, length),
      weatherCode: weatherCode.slice(0, length),

      meta: {
        source: "open-meteo",
        safe: true,
        length,
      },
    });
  } catch (e) {
    console.error("WEATHER ERROR:", e);

    return Response.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}