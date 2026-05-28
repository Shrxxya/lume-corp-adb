"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function VenueMap({
  venues = [],
  onSelectVenue,
}) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  // INIT MAP
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,

      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: [
              "https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
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

      center: [77.5946, 12.9716], // default only
      zoom: 11,
    });

    map.addControl(
      new maplibregl.NavigationControl(),
      "top-right"
    );

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // MARKERS
  useEffect(() => {
    if (!mapRef.current) return;

    // remove old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    if (!venues.length) return;

    const bounds = new maplibregl.LngLatBounds();

    venues.forEach((v) => {
      if (!v.lat || !v.lon) return;

      // PRETTY POPUP
      const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 20,
        className: "venue-popup",
      }).setHTML(`
        <div style="
          font-family: Inter, sans-serif;
          min-width: 220px;
          padding: 4px;
        ">
          <div style="
            font-size: 16px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 6px;
          ">
            ${v.name || "Unnamed Venue"}
          </div>

          <div style="
            font-size: 13px;
            color: #4b5563;
            line-height: 1.5;
            margin-bottom: 8px;
          ">
            ${v.address || "No address available"}
          </div>

          ${
            v.category
              ? `
            <div style="
              display:inline-block;
              background:#eef2e6;
              color:#58644B;
              padding:4px 10px;
              border-radius:999px;
              font-size:11px;
              font-weight:600;
            ">
              ${v.category}
            </div>
          `
              : ""
          }
        </div>
      `);

      const marker = new maplibregl.Marker({
        color: "#58644B",
      })
        .setLngLat([v.lon, v.lat])
        .addTo(mapRef.current);

      // CLICK = SELECT VENUE
      marker.getElement().addEventListener("click", () => {
        onSelectVenue?.(v);
      });

      // HOVER = SHOW POPUP
      marker.getElement().addEventListener("mouseenter", () => {
        popup
          .setLngLat([v.lon, v.lat])
          .addTo(mapRef.current);
      });

      marker.getElement().addEventListener("mouseleave", () => {
        popup.remove();
      });

      markersRef.current.push(marker);

      // extend bounds
      bounds.extend([v.lon, v.lat]);
    });

    // AUTO CENTER MAP TO RESULTS
    mapRef.current.fitBounds(bounds, {
      padding: 80,
      duration: 1200,
      maxZoom: 14,
    });

  }, [venues]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "500px",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid #58644B",
        // earthy green tint
        //filter: "hue-rotate(85deg) saturate(1.2)",
      }}
    />
  );
}