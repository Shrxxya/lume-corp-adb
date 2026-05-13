"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function OlaVenueMap({ venues = [] }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: containerRef.current,

      // IMPORTANT: working base map
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: [
              "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
          },
        ],
      },

      center: [77.5946, 12.9716], // Bangalore default
      zoom: 11,
    });

    mapRef.current.addControl(
      new maplibregl.NavigationControl()
    );
  }, []);

  // ADD PINS
  useEffect(() => {
    if (!mapRef.current || !venues.length) return;

    venues.forEach((v) => {
      if (!v.lat || !v.lng) return;

      new maplibregl.Marker({ color: "#62754c" })
        .setLngLat([v.lng, v.lat])
        .setPopup(
          new maplibregl.Popup().setHTML(
            `<b>${v.name}</b><br/>${v.address}`
          )
        )
        .addTo(mapRef.current);
    });
  }, [venues]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "500px",
        borderRadius: "20px",
      }}
    />
  );
}