// ─────────────────────────────────────────────────────────────────────────────
// 2026 FIFA World Cup — Third-Place Team R32 Slot Mapping
// ─────────────────────────────────────────────────────────────────────────────
//
// Each R32 match that uses a "Best 3rd" slot has a defined set of groups
// whose 3rd-place team can fill it (official FIFA rules):
//
//   M74  ← Best 3rd from groups A / B / C / D / F
//   M77  ← Best 3rd from groups C / D / F / G / H
//   M79  ← Best 3rd from groups C / E / F / H / I
//   M80  ← Best 3rd from groups E / H / I / J / K
//   M81  ← Best 3rd from groups B / E / F / I / J
//   M82  ← Best 3rd from groups A / E / H / I / J
//   M85  ← Best 3rd from groups E / F / G / I / J
//   M87  ← Best 3rd from groups D / E / I / J / L
//
// There are C(12,8) = 495 possible combinations of 8 qualifying groups.
// The THIRD_PLACE_MAPPING table maps a sorted comma-separated list of the
// 8 qualifying group IDs → { matchId: "3X" } where X is the group letter.
//
// The full official 495-row table is not yet publicly available.
// Paste official rows here as they are confirmed.
//
// The store uses a constraint-satisfaction fallback when no exact match is found:
// it distributes the 8 qualified 3rd-place teams to slots respecting the
// group constraints above. A warning banner is shown when fallback is active.
// ─────────────────────────────────────────────────────────────────────────────

export const THIRD_PLACE_MAPPING: Record<string, Record<string, string>> = {
  // Example entry (all 12 groups qualifying their top-8 3rd-place teams):
  // "A,B,C,D,E,F,G,H": {
  //   "M74": "3A", "M77": "3C", "M79": "3E", "M80": "3H",
  //   "M81": "3B", "M82": "3G", "M85": "3F", "M87": "3D",
  // },
  //
  // Add more rows here. Key format: groups sorted A→L, comma-separated.
  // e.g. "A,B,C,D,E,F,G,I" for groups A B C D E F G I qualifying.
};

// The 8 R32 match IDs that host a Best-3rd-place team slot (in bracket order)
export const THIRD_PLACE_MATCH_SLOTS = ["M74","M77","M79","M80","M81","M82","M85","M87"] as const;

// Which group letters are eligible for each slot — used by the fallback algorithm
export const SLOT_ELIGIBLE_GROUPS: Record<string, string[]> = {
  M74: ["A","B","C","D","F"],
  M77: ["C","D","F","G","H"],
  M79: ["C","E","F","H","I"],
  M80: ["E","H","I","J","K"],
  M81: ["B","E","F","I","J"],
  M82: ["A","E","H","I","J"],
  M85: ["E","F","G","I","J"],
  M87: ["D","E","I","J","L"],
};
