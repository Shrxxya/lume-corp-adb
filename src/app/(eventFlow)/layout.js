"use client";

import ProgressMap from "@/components/ProgressMap";

export default function EventFlowLayout({ children }) {
  return (
    <div>
      <ProgressMap />
      {children}
    </div>
  );
}