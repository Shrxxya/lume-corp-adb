export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  const res = await fetch(
    `https://api.olamaps.io/places/v1/geocode?address=${encodeURIComponent(city)}&api_key=${process.env.NEXT_PUBLIC_OLA_MAPS_API_KEY}`
  );

  const data = await res.json();

  const loc = data?.geocodingResults?.[0]?.geometry?.location;

  console.log("CITY:", city);
console.log("RAW GEO RESPONSE:", data);

  return Response.json({
    lat: loc?.lat,
    lng: loc?.lng,
  });
}