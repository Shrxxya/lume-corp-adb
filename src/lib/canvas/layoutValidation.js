// lib/layoutValidation.js

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

function rect(item) {
  return {
    left: item.x,
    top: item.y,
    right: item.x + item.width,
    bottom: item.y + item.height,
  };
}

function intersects(a, b) {
  return !(
    a.right < b.left ||
    a.left > b.right ||
    a.bottom < b.top ||
    a.top > b.bottom
  );
}

function center(item) {
  return {
    x: item.x + item.width / 2,
    y: item.y + item.height / 2,
  };
}

function distance(a, b) {
  const ac = center(a);
  const bc = center(b);

  return Math.sqrt(
    (ac.x - bc.x) ** 2 +
    (ac.y - bc.y) ** 2
  );
}

// ─────────────────────────────────────────────────────────────
// LOCAL VALIDATION
// ─────────────────────────────────────────────────────────────

export function validateLayout(items, canvasWidth, canvasHeight) {
  const issues = [];

  // ============================================================
  // 1. OVERLAPS
  // ============================================================

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i];
      const b = items[j];

      if (intersects(rect(a), rect(b))) {
        issues.push({
          type: "critical",
          code: "OVERLAP",
          message: `${a.type} overlaps with ${b.type}`,
          items: [a.id, b.id],
        });
      }
    }
  }

  // ============================================================
  // 2. OUTSIDE BOUNDS
  // ============================================================

  items.forEach((item) => {
    if (
      item.x < 0 ||
      item.y < 0 ||
      item.x + item.width > canvasWidth ||
      item.y + item.height > canvasHeight
    ) {
      issues.push({
        type: "critical",
        code: "OUT_OF_BOUNDS",
        message: `${item.type} is outside venue bounds`,
        items: [item.id],
      });
    }
  });

  // ============================================================
  // 3. RED CARPET RULES
  // ============================================================

  const carpets = items.filter((i) =>
    i.type.toLowerCase().includes("red carpet")
  );

  carpets.forEach((carpet) => {
    items.forEach((item) => {
      if (item.id === carpet.id) return;

      if (intersects(rect(carpet), rect(item))) {
        issues.push({
          type: "critical",
          code: "CARPET_BLOCKED",
          message: `${item.type} blocks the Red Carpet`,
          items: [carpet.id, item.id],
        });
      }
    });
  });

//   // ============================================================
//   // 5. REGISTRATION SHOULD BE NEAR ENTRANCE
//   // ============================================================

//   const registration = items.find((i) =>
//     i.type.toLowerCase().includes("registration")
//   );

//   if (registration && registration.y > canvasHeight * 0.4) {
//     issues.push({
//       type: "warning",
//       code: "REGISTRATION_POSITION",
//       message: "Registration Desk should be near entrance",
//       items: [registration.id],
//     });
//   }

  // ============================================================
  // 6. TOO MANY ITEMS PACKED
  // ============================================================

  const totalArea = canvasWidth * canvasHeight;

  const usedArea = items.reduce((sum, item) => {
    return sum + item.width * item.height;
  }, 0);

  const density = usedArea / totalArea;

  if (density > 0.65) {
    issues.push({
      type: "warning",
      code: "HIGH_DENSITY",
      message: "Layout may feel overcrowded",
      items: [],
    });
  }

  return issues;
}