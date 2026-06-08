"use client";

import { useEffect, useState } from "react";
import { fetchVenues } from "@/lib/maps/fetchPOI";
import VenueMap from "@/components/VenueMap";
import { useEventStore } from "@/store/useEventStore";

export default function VenuePicker({ summaryData }) {
    const hasHydrated = useEventStore((s) => s.hasHydrated);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectedVenue = useEventStore((s) => s.selectedVenue);
  const setSelectedVenue = useEventStore((s) => s.setSelectedVenue);

//   useEffect(() => {
//     if (!hasHydrated) return;
//   console.log("🟣 VenuePicker mounted/updated");
//   console.log("summaryData:", summaryData);
//   console.log("location:", summaryData?.location);

//   if (!summaryData?.location) {
//     console.log("No location provided, skipping fetch");
//     return;
//   }

//   async function load() {
//     console.log("Loading venues for:", summaryData.location);

//     setLoading(true);

//     const data = await fetchVenues(summaryData.location);

//     console.log("Received venues:", data);

//     setVenues(data);
//     setLoading(false);
//   }

//   load();
// }, [summaryData?.location, hasHydrated]);
useEffect(() => {
  if (!hasHydrated) return;

  const city = summaryData?.location?.trim();

  // BLOCK EMPTY / INVALID INPUT
  if (!city || city.length < 2) {
    setVenues([]);      // optional: clear map
    return;
  }

  const timeout = setTimeout(async () => {
    setLoading(true);

    try {
      const data = await fetchVenues(city);
      setVenues(data || []);
    } catch (err) {
      console.warn("Venue fetch failed:", err.message);
      setVenues([]);
    } finally {
      setLoading(false);
    }
  }, 400); // debounce

  return () => clearTimeout(timeout);
}, [summaryData?.location, hasHydrated]);

//   useEffect(() => {
//     if (!summaryData?.location) return;

//     async function load() {
//       setLoading(true);

//       const data = await fetchVenues(summaryData.location);

//       setVenues(data);
//       setLoading(false);
//     }

//     load();
//   }, [summaryData?.location]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h3
      className="text-sm uppercase tracking-wider"
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "0.875rem",
        color: "var(--color-dark)",
        opacity: 0.7,
        letterSpacing: "0.05em",
      }}
    >
        Venues in {summaryData?.location}
      </h3>

      {loading && <p>Loading venues...</p>}

      <div className="w-full h-[500px] mt-3"
        style={{
        width: "100%",
        height: "500px",
        }}>
        <VenueMap
            venues={venues}
            onSelectVenue={setSelectedVenue}
        />
      </div>
        {selectedVenue && (
            <div
                className="mt-6 p-5 rounded-2xl"
                style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(98,117,76,0.25)",
                backdropFilter: "blur(10px)",
                }}
            >
                <p className="text-sm opacity-60 mb-1">
                Selected Venue
                </p>

                <h3 className="text-lg font-semibold">
                {selectedVenue.name}
                </h3>

                <p className="text-sm opacity-70 mt-1">
                {selectedVenue.address}
                </p>
            </div>
        )}
    </div>
  );
}