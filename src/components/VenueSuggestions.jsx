"use client";

import { useEffect, useState } from "react";
import { useEventStore } from "@/store/useEventStore";
import OlaVenueMap from "./OlaVenueMap";
import { fetchVenuesByCity } from "@/lib/fetchVenues";

export default function VenueSuggestions() {
  const getSummaryData = useEventStore((s) => s.getSummaryData);
  const summaryData = getSummaryData();

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadVenues = async () => {
      if (!summaryData?.location) return;

      setLoading(true);

      const city = summaryData.location.split(",")[0];

      const results = await fetchVenuesByCity(city);

      setVenues(results);

      setLoading(false);
    };

    loadVenues();
  }, [summaryData?.location]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-6">
        Suggested Venues
      </h2>

      {loading ? (
        <div className="p-10 border rounded-3xl">Loading...</div>
      ) : (
        <>
          <OlaVenueMap venues={venues} />

          {/* <div className="grid md:grid-cols-3 gap-4 mt-6">
            {venues.map((v, i) => (
              <div key={i} className="p-4 border rounded-xl">
                <h3 className="font-semibold">{v.name}</h3>
                <p className="text-sm opacity-70">{v.address}</p>
              </div>
            ))}
          </div> */}
        </>
      )}
    </div>
  );
}