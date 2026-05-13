import { NextResponse } from "next/server";
import { getOlaToken } from "@/lib/olaToken";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json({ venues: [], center: null });
  }

  try {
    const token = await getOlaToken();

    // =========================
    // 1. GEOCODE
    // =========================
    const geoRes = await fetch(
      `https://api.olamaps.io/places/v1/geocode?address=${encodeURIComponent(city)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": "en",
        },
      }
    );

    const geoData = await geoRes.json();
    const loc = geoData?.geocodingResults?.[0]?.geometry?.location;

    if (!loc) {
      return NextResponse.json({ venues: [], center: null });
    }

    // =========================
    // 2. NEARBY SEARCH — layers=venue is the correct param (not types)
    // =========================
    const venueRes = await fetch(
      `https://api.olamaps.io/places/v1/nearbysearch?layers=venue&location=${loc.lat},${loc.lng}&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Request-Id": `${Date.now()}`,
          "Accept-Language": "en",
        },
      }
    );

    const venueData = await venueRes.json();
    console.log("RAW VENUE RESPONSE:", JSON.stringify(venueData, null, 2));

    const rawList = venueData?.predictions || venueData?.results || [];

    // =========================
    // 3. PLACE DETAILS for coordinates + full info
    // =========================
    const venues = await Promise.all(
      rawList.map(async (v) => {
        try {
          const detailsRes = await fetch(
            `https://api.olamaps.io/places/v1/details?place_id=${v.place_id || v.reference}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Accept-Language": "en",
              },
            }
          );

          const details = await detailsRes.json();
          const dloc = details?.result?.geometry?.location;

          return {
            id: v.place_id || v.reference,
            name: v?.structured_formatting?.main_text || v?.name || v?.description,
            description: v?.description,
            address: details?.result?.formatted_address || v?.description,
            types: v?.types || details?.result?.types || [],
            lat: dloc?.lat,
            lng: dloc?.lng,
          };
        } catch (e) {
          return null;
        }
      })
    );

    return NextResponse.json({
      center: loc,
      venues: venues.filter((v) => v && v.lat && v.lng),
    });
  } catch (err) {
    console.error("VENUE API ERROR:", err);
    return NextResponse.json(
      { error: err.message, venues: [], center: null },
      { status: 500 }
    );
  }
}