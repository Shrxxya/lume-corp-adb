import Fuse from "fuse.js";
import { permittedItems } from "./permittedItems";

const fuse = new Fuse(permittedItems, {
  threshold: 0.4,
  includeScore: true,
});

export function validateItem(input) {
  if (!input?.trim()) {
    return {
      valid: false,
      message: "Enter an item name",
    };
  }

  const results = fuse.search(input);

  // no match
  if (!results.length) {
    return {
      valid: false,
      message: "No matching event element found",
    };
  }

  const bestMatch = results[0];

  // weak match
  if (bestMatch.score > 0.4) {
    return {
    valid: false,
    message: `Did you mean "${bestMatch.item}"?`,
    };
  }

  return {
    valid: true,
    matched: bestMatch.item,
  };
}