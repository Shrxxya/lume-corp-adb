const GEOAPIFY_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_KEY;

export async function fetchVenues(city) {
  console.log("Fetching venues for:", city);

  const { lat, lon } = await geocodeCity(city);
  if (!lat || !lon) return [];

  console.log("Geocoded city:", { lat, lon });

  const categories = [
    "activity.events_venue",
  ];

  const url = `https://api.geoapify.com/v2/places?categories=${categories.join(
    ","
  )}&filter=circle:${lon},${lat},10000&limit=20&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_KEY}`;

  console.log("Final API URL:", url);

  const res = await fetch(url);

  const data = await res.json();

  console.log("Raw API response:", data);

  if (!data.features) {
    console.error("No features found:", data);
    return [];
  }

  return data.features.map((place) => ({
    id: place.properties.place_id,
    name: place.properties.name || "Unnamed place",
    address: place.properties.formatted,
    lat: place.properties.lat,
    lon: place.properties.lon,
    category: place.properties.categories?.[0],
  }));
}

export async function geocodeCity(city) {
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(city)}&limit=1&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  const result = data.features?.[0];

  if (!result) {
    console.warn("City not found for query:", city);
    return null;
    }

  return {
    lat: result.properties.lat,
    lon: result.properties.lon,
  };
}