export async function fetchVenuesByCity(city) {
  const res = await fetch(`/api/venues?city=${encodeURIComponent(city)}`);

  const data = await res.json();

  return data.venues || [];
}