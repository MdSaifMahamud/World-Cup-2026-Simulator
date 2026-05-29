import type { Match } from "@/lib/types";

// ─────────────────────────────────────────────────────────────────────────────
// VENUE SHORTHAND
// ─────────────────────────────────────────────────────────────────────────────
// ATL  = Mercedes-Benz Stadium, Atlanta
// ARL  = AT&T Stadium, Dallas/Arlington
// BOS  = Gillette Stadium, Boston/Foxborough
// HOU  = NRG Stadium, Houston
// KC   = Arrowhead Stadium, Kansas City
// LA   = SoFi Stadium, Los Angeles
// MIA  = Hard Rock Stadium, Miami
// NJ   = MetLife Stadium, New York/New Jersey
// PHI  = Lincoln Financial Field, Philadelphia
// SEA  = Lumen Field, Seattle
// SF   = Levi's Stadium, San Francisco/Santa Clara
// TOR  = BMO Field, Toronto
// VAN  = BC Place, Vancouver
// GDL  = Estadio Akron, Guadalajara
// MTY  = Estadio BBVA, Monterrey
// MEX  = Estadio Azteca, Mexico City
// ─────────────────────────────────────────────────────────────────────────────

const groupFixtures: Match[] = [
  // ══════════════ GROUP A ══════════════
  // Mexico (A1) | South Korea (A2) | South Africa (A3) | Czech Republic (A4)
  { id: "M1",  matchNumber: 1,  stage: "GROUP", group: "A", homeTeamId: "mex", awayTeamId: "rsa", status: "NOT_STARTED", date: "2026-06-11", venue: "Estadio Azteca, Mexico City" },
  { id: "M2",  matchNumber: 2,  stage: "GROUP", group: "A", homeTeamId: "kor", awayTeamId: "cze", status: "NOT_STARTED", date: "2026-06-12", venue: "Estadio Akron, Guadalajara" },
  { id: "M3",  matchNumber: 3,  stage: "GROUP", group: "A", homeTeamId: "cze", awayTeamId: "rsa", status: "NOT_STARTED", date: "2026-06-18", venue: "Mercedes-Benz Stadium, Atlanta" },
  { id: "M4",  matchNumber: 4,  stage: "GROUP", group: "A", homeTeamId: "mex", awayTeamId: "kor", status: "NOT_STARTED", date: "2026-06-18", venue: "Estadio Akron, Guadalajara" },
  { id: "M5",  matchNumber: 5,  stage: "GROUP", group: "A", homeTeamId: "rsa", awayTeamId: "kor", status: "NOT_STARTED", date: "2026-06-25", venue: "Estadio BBVA, Monterrey" },
  { id: "M6",  matchNumber: 6,  stage: "GROUP", group: "A", homeTeamId: "cze", awayTeamId: "mex", status: "NOT_STARTED", date: "2026-06-25", venue: "Estadio Azteca, Mexico City" },

  // ══════════════ GROUP B ══════════════
  // Canada (B1) | Switzerland (B2) | Qatar (B3) | Bosnia & Herzegovina (B4)
  { id: "M7",  matchNumber: 7,  stage: "GROUP", group: "B", homeTeamId: "can", awayTeamId: "bih", status: "NOT_STARTED", date: "2026-06-12", venue: "BMO Field, Toronto" },
  { id: "M8",  matchNumber: 8,  stage: "GROUP", group: "B", homeTeamId: "qat", awayTeamId: "swi", status: "NOT_STARTED", date: "2026-06-13", venue: "Levi's Stadium, San Francisco" },
  { id: "M9",  matchNumber: 9,  stage: "GROUP", group: "B", homeTeamId: "swi", awayTeamId: "bih", status: "NOT_STARTED", date: "2026-06-18", venue: "SoFi Stadium, Los Angeles" },
  { id: "M10", matchNumber: 10, stage: "GROUP", group: "B", homeTeamId: "can", awayTeamId: "qat", status: "NOT_STARTED", date: "2026-06-18", venue: "BC Place, Vancouver" },
  { id: "M11", matchNumber: 11, stage: "GROUP", group: "B", homeTeamId: "swi", awayTeamId: "can", status: "NOT_STARTED", date: "2026-06-24", venue: "BC Place, Vancouver" },
  { id: "M12", matchNumber: 12, stage: "GROUP", group: "B", homeTeamId: "bih", awayTeamId: "qat", status: "NOT_STARTED", date: "2026-06-24", venue: "Lumen Field, Seattle" },

  // ══════════════ GROUP C ══════════════
  // Brazil (C1) | Morocco (C2) | Scotland (C3) | Haiti (C4)
  { id: "M13", matchNumber: 13, stage: "GROUP", group: "C", homeTeamId: "bra", awayTeamId: "mor", status: "NOT_STARTED", date: "2026-06-13", venue: "MetLife Stadium, New York/NJ" },
  { id: "M14", matchNumber: 14, stage: "GROUP", group: "C", homeTeamId: "hai", awayTeamId: "sco", status: "NOT_STARTED", date: "2026-06-14", venue: "Gillette Stadium, Boston" },
  { id: "M15", matchNumber: 15, stage: "GROUP", group: "C", homeTeamId: "sco", awayTeamId: "mor", status: "NOT_STARTED", date: "2026-06-19", venue: "Gillette Stadium, Boston" },
  { id: "M16", matchNumber: 16, stage: "GROUP", group: "C", homeTeamId: "bra", awayTeamId: "hai", status: "NOT_STARTED", date: "2026-06-20", venue: "Lincoln Financial Field, Philadelphia" },
  { id: "M17", matchNumber: 17, stage: "GROUP", group: "C", homeTeamId: "mor", awayTeamId: "hai", status: "NOT_STARTED", date: "2026-06-24", venue: "Mercedes-Benz Stadium, Atlanta" },
  { id: "M18", matchNumber: 18, stage: "GROUP", group: "C", homeTeamId: "sco", awayTeamId: "bra", status: "NOT_STARTED", date: "2026-06-24", venue: "Hard Rock Stadium, Miami" },

  // ══════════════ GROUP D ══════════════
  // USA (D1) | Australia (D2) | Paraguay (D3) | Turkey (D4)
  { id: "M19", matchNumber: 19, stage: "GROUP", group: "D", homeTeamId: "usa", awayTeamId: "par", status: "NOT_STARTED", date: "2026-06-13", venue: "SoFi Stadium, Los Angeles" },
  { id: "M20", matchNumber: 20, stage: "GROUP", group: "D", homeTeamId: "aus", awayTeamId: "tur", status: "NOT_STARTED", date: "2026-06-14", venue: "BC Place, Vancouver" },
  { id: "M21", matchNumber: 21, stage: "GROUP", group: "D", homeTeamId: "usa", awayTeamId: "aus", status: "NOT_STARTED", date: "2026-06-19", venue: "Lumen Field, Seattle" },
  { id: "M22", matchNumber: 22, stage: "GROUP", group: "D", homeTeamId: "tur", awayTeamId: "par", status: "NOT_STARTED", date: "2026-06-20", venue: "Levi's Stadium, San Francisco" },
  { id: "M23", matchNumber: 23, stage: "GROUP", group: "D", homeTeamId: "tur", awayTeamId: "usa", status: "NOT_STARTED", date: "2026-06-26", venue: "SoFi Stadium, Los Angeles" },
  { id: "M24", matchNumber: 24, stage: "GROUP", group: "D", homeTeamId: "par", awayTeamId: "aus", status: "NOT_STARTED", date: "2026-06-26", venue: "Levi's Stadium, San Francisco" },

  // ══════════════ GROUP E ══════════════
  // Germany (E1) | Ecuador (E2) | Ivory Coast (E3) | Curaçao (E4)
  { id: "M25", matchNumber: 25, stage: "GROUP", group: "E", homeTeamId: "ger", awayTeamId: "cur", status: "NOT_STARTED", date: "2026-06-14", venue: "NRG Stadium, Houston" },
  { id: "M26", matchNumber: 26, stage: "GROUP", group: "E", homeTeamId: "civ", awayTeamId: "ecu", status: "NOT_STARTED", date: "2026-06-15", venue: "Lincoln Financial Field, Philadelphia" },
  { id: "M27", matchNumber: 27, stage: "GROUP", group: "E", homeTeamId: "ger", awayTeamId: "civ", status: "NOT_STARTED", date: "2026-06-20", venue: "BMO Field, Toronto" },
  { id: "M28", matchNumber: 28, stage: "GROUP", group: "E", homeTeamId: "ecu", awayTeamId: "cur", status: "NOT_STARTED", date: "2026-06-21", venue: "Arrowhead Stadium, Kansas City" },
  { id: "M29", matchNumber: 29, stage: "GROUP", group: "E", homeTeamId: "cur", awayTeamId: "civ", status: "NOT_STARTED", date: "2026-06-25", venue: "Lincoln Financial Field, Philadelphia" },
  { id: "M30", matchNumber: 30, stage: "GROUP", group: "E", homeTeamId: "ecu", awayTeamId: "ger", status: "NOT_STARTED", date: "2026-06-25", venue: "MetLife Stadium, New York/NJ" },

  // ══════════════ GROUP F ══════════════
  // Netherlands (F1) | Japan (F2) | Tunisia (F3) | Sweden (F4)
  { id: "M31", matchNumber: 31, stage: "GROUP", group: "F", homeTeamId: "ned", awayTeamId: "jap", status: "NOT_STARTED", date: "2026-06-14", venue: "AT&T Stadium, Dallas" },
  { id: "M32", matchNumber: 32, stage: "GROUP", group: "F", homeTeamId: "swe", awayTeamId: "tun", status: "NOT_STARTED", date: "2026-06-15", venue: "Estadio Akron, Guadalajara" },
  { id: "M33", matchNumber: 33, stage: "GROUP", group: "F", homeTeamId: "ned", awayTeamId: "swe", status: "NOT_STARTED", date: "2026-06-20", venue: "NRG Stadium, Houston" },
  { id: "M34", matchNumber: 34, stage: "GROUP", group: "F", homeTeamId: "tun", awayTeamId: "jap", status: "NOT_STARTED", date: "2026-06-21", venue: "Estadio Akron, Guadalajara" },
  { id: "M35", matchNumber: 35, stage: "GROUP", group: "F", homeTeamId: "tun", awayTeamId: "ned", status: "NOT_STARTED", date: "2026-06-26", venue: "Arrowhead Stadium, Kansas City" },
  { id: "M36", matchNumber: 36, stage: "GROUP", group: "F", homeTeamId: "jap", awayTeamId: "swe", status: "NOT_STARTED", date: "2026-06-26", venue: "AT&T Stadium, Dallas" },

  // ══════════════ GROUP G ══════════════
  // Belgium (G1) | Iran (G2) | Egypt (G3) | New Zealand (G4)
  { id: "M37", matchNumber: 37, stage: "GROUP", group: "G", homeTeamId: "bel", awayTeamId: "egy", status: "NOT_STARTED", date: "2026-06-15", venue: "Lumen Field, Seattle" },
  { id: "M38", matchNumber: 38, stage: "GROUP", group: "G", homeTeamId: "irn", awayTeamId: "nzl", status: "NOT_STARTED", date: "2026-06-16", venue: "SoFi Stadium, Los Angeles" },
  { id: "M39", matchNumber: 39, stage: "GROUP", group: "G", homeTeamId: "bel", awayTeamId: "irn", status: "NOT_STARTED", date: "2026-06-21", venue: "SoFi Stadium, Los Angeles" },
  { id: "M40", matchNumber: 40, stage: "GROUP", group: "G", homeTeamId: "nzl", awayTeamId: "egy", status: "NOT_STARTED", date: "2026-06-21", venue: "BC Place, Vancouver" },
  { id: "M41", matchNumber: 41, stage: "GROUP", group: "G", homeTeamId: "nzl", awayTeamId: "bel", status: "NOT_STARTED", date: "2026-06-27", venue: "BC Place, Vancouver" },
  { id: "M42", matchNumber: 42, stage: "GROUP", group: "G", homeTeamId: "egy", awayTeamId: "irn", status: "NOT_STARTED", date: "2026-06-27", venue: "Lumen Field, Seattle" },

  // ══════════════ GROUP H ══════════════
  // Spain (H1) | Uruguay (H2) | Saudi Arabia (H3) | Cape Verde (H4)
  { id: "M43", matchNumber: 43, stage: "GROUP", group: "H", homeTeamId: "esp", awayTeamId: "cpv", status: "NOT_STARTED", date: "2026-06-15", venue: "Mercedes-Benz Stadium, Atlanta" },
  { id: "M44", matchNumber: 44, stage: "GROUP", group: "H", homeTeamId: "ksa", awayTeamId: "uru", status: "NOT_STARTED", date: "2026-06-15", venue: "Hard Rock Stadium, Miami" },
  { id: "M45", matchNumber: 45, stage: "GROUP", group: "H", homeTeamId: "esp", awayTeamId: "ksa", status: "NOT_STARTED", date: "2026-06-21", venue: "Mercedes-Benz Stadium, Atlanta" },
  { id: "M46", matchNumber: 46, stage: "GROUP", group: "H", homeTeamId: "uru", awayTeamId: "cpv", status: "NOT_STARTED", date: "2026-06-21", venue: "Hard Rock Stadium, Miami" },
  { id: "M47", matchNumber: 47, stage: "GROUP", group: "H", homeTeamId: "cpv", awayTeamId: "ksa", status: "NOT_STARTED", date: "2026-06-27", venue: "NRG Stadium, Houston" },
  { id: "M48", matchNumber: 48, stage: "GROUP", group: "H", homeTeamId: "uru", awayTeamId: "esp", status: "NOT_STARTED", date: "2026-06-27", venue: "Estadio Akron, Guadalajara" },

  // ══════════════ GROUP I ══════════════
  // France (I1) | Senegal (I2) | Norway (I3) | Iraq (I4)
  { id: "M49", matchNumber: 49, stage: "GROUP", group: "I", homeTeamId: "fra", awayTeamId: "sen", status: "NOT_STARTED", date: "2026-06-16", venue: "MetLife Stadium, New York/NJ" },
  { id: "M50", matchNumber: 50, stage: "GROUP", group: "I", homeTeamId: "irq", awayTeamId: "nor", status: "NOT_STARTED", date: "2026-06-16", venue: "Gillette Stadium, Boston" },
  { id: "M51", matchNumber: 51, stage: "GROUP", group: "I", homeTeamId: "fra", awayTeamId: "irq", status: "NOT_STARTED", date: "2026-06-22", venue: "Lincoln Financial Field, Philadelphia" },
  { id: "M52", matchNumber: 52, stage: "GROUP", group: "I", homeTeamId: "nor", awayTeamId: "sen", status: "NOT_STARTED", date: "2026-06-23", venue: "BMO Field, Toronto" },
  { id: "M53", matchNumber: 53, stage: "GROUP", group: "I", homeTeamId: "nor", awayTeamId: "fra", status: "NOT_STARTED", date: "2026-06-26", venue: "Gillette Stadium, Boston" },
  { id: "M54", matchNumber: 54, stage: "GROUP", group: "I", homeTeamId: "sen", awayTeamId: "irq", status: "NOT_STARTED", date: "2026-06-26", venue: "BMO Field, Toronto" },

  // ══════════════ GROUP J ══════════════
  // Argentina (J1) | Austria (J2) | Algeria (J3) | Jordan (J4)
  { id: "M55", matchNumber: 55, stage: "GROUP", group: "J", homeTeamId: "arg", awayTeamId: "alg", status: "NOT_STARTED", date: "2026-06-17", venue: "Arrowhead Stadium, Kansas City" },
  { id: "M56", matchNumber: 56, stage: "GROUP", group: "J", homeTeamId: "aut", awayTeamId: "jor", status: "NOT_STARTED", date: "2026-06-17", venue: "Levi's Stadium, San Francisco" },
  { id: "M57", matchNumber: 57, stage: "GROUP", group: "J", homeTeamId: "arg", awayTeamId: "aut", status: "NOT_STARTED", date: "2026-06-22", venue: "AT&T Stadium, Dallas" },
  { id: "M58", matchNumber: 58, stage: "GROUP", group: "J", homeTeamId: "jor", awayTeamId: "alg", status: "NOT_STARTED", date: "2026-06-23", venue: "Levi's Stadium, San Francisco" },
  { id: "M59", matchNumber: 59, stage: "GROUP", group: "J", homeTeamId: "alg", awayTeamId: "aut", status: "NOT_STARTED", date: "2026-06-28", venue: "Arrowhead Stadium, Kansas City" },
  { id: "M60", matchNumber: 60, stage: "GROUP", group: "J", homeTeamId: "jor", awayTeamId: "arg", status: "NOT_STARTED", date: "2026-06-28", venue: "AT&T Stadium, Dallas" },

  // ══════════════ GROUP K ══════════════
  // Portugal (K1) | Colombia (K2) | Uzbekistan (K3) | DR Congo (K4)
  { id: "M61", matchNumber: 61, stage: "GROUP", group: "K", homeTeamId: "por", awayTeamId: "cod", status: "NOT_STARTED", date: "2026-06-17", venue: "NRG Stadium, Houston" },
  { id: "M62", matchNumber: 62, stage: "GROUP", group: "K", homeTeamId: "uzb", awayTeamId: "col", status: "NOT_STARTED", date: "2026-06-18", venue: "Estadio Azteca, Mexico City" },
  { id: "M63", matchNumber: 63, stage: "GROUP", group: "K", homeTeamId: "por", awayTeamId: "uzb", status: "NOT_STARTED", date: "2026-06-23", venue: "NRG Stadium, Houston" },
  { id: "M64", matchNumber: 64, stage: "GROUP", group: "K", homeTeamId: "col", awayTeamId: "cod", status: "NOT_STARTED", date: "2026-06-24", venue: "Estadio Akron, Guadalajara" },
  { id: "M65", matchNumber: 65, stage: "GROUP", group: "K", homeTeamId: "col", awayTeamId: "por", status: "NOT_STARTED", date: "2026-06-28", venue: "Hard Rock Stadium, Miami" },
  { id: "M66", matchNumber: 66, stage: "GROUP", group: "K", homeTeamId: "cod", awayTeamId: "uzb", status: "NOT_STARTED", date: "2026-06-28", venue: "Mercedes-Benz Stadium, Atlanta" },

  // ══════════════ GROUP L ══════════════
  // England (L1) | Croatia (L2) | Panama (L3) | Ghana (L4)
  { id: "M67", matchNumber: 67, stage: "GROUP", group: "L", homeTeamId: "eng", awayTeamId: "cro", status: "NOT_STARTED", date: "2026-06-17", venue: "AT&T Stadium, Dallas" },
  { id: "M68", matchNumber: 68, stage: "GROUP", group: "L", homeTeamId: "gha", awayTeamId: "pan", status: "NOT_STARTED", date: "2026-06-18", venue: "BMO Field, Toronto" },
  { id: "M69", matchNumber: 69, stage: "GROUP", group: "L", homeTeamId: "eng", awayTeamId: "gha", status: "NOT_STARTED", date: "2026-06-23", venue: "Gillette Stadium, Boston" },
  { id: "M70", matchNumber: 70, stage: "GROUP", group: "L", homeTeamId: "pan", awayTeamId: "cro", status: "NOT_STARTED", date: "2026-06-24", venue: "Gillette Stadium, Boston" },
  { id: "M71", matchNumber: 71, stage: "GROUP", group: "L", homeTeamId: "pan", awayTeamId: "eng", status: "NOT_STARTED", date: "2026-06-27", venue: "MetLife Stadium, New York/NJ" },
  { id: "M72", matchNumber: 72, stage: "GROUP", group: "L", homeTeamId: "cro", awayTeamId: "gha", status: "NOT_STARTED", date: "2026-06-27", venue: "Lincoln Financial Field, Philadelphia" },
];

// ─────────────────────────────────────────────────────────────────────────────
// KNOCKOUT STAGE — official bracket per 2026 FIFA World Cup schedule
// ─────────────────────────────────────────────────────────────────────────────
// Best-3rd slot constraints (which groups' 3rd-place teams can fill each slot):
//   M74: Best 3rd from A/B/C/D/F
//   M77: Best 3rd from C/D/F/G/H
//   M79: Best 3rd from C/E/F/H/I
//   M80: Best 3rd from E/H/I/J/K
//   M81: Best 3rd from B/E/F/I/J
//   M82: Best 3rd from A/E/H/I/J
//   M85: Best 3rd from E/F/G/I/J
//   M87: Best 3rd from D/E/I/J/L
// ─────────────────────────────────────────────────────────────────────────────

const knockoutFixtures: Match[] = [
  // ══ ROUND OF 32 ══
  { id: "M73", matchNumber: 73,  stage: "R32", homePlaceholder: "2A", awayPlaceholder: "2B",             status: "NOT_STARTED", date: "2026-06-28", venue: "SoFi Stadium, Los Angeles" },
  { id: "M74", matchNumber: 74,  stage: "R32", homePlaceholder: "1E", awayPlaceholder: "Best 3rd (A/B/C/D/F)", status: "NOT_STARTED", date: "2026-06-29", venue: "Gillette Stadium, Boston" },
  { id: "M75", matchNumber: 75,  stage: "R32", homePlaceholder: "1F", awayPlaceholder: "2C",             status: "NOT_STARTED", date: "2026-06-30", venue: "Estadio Akron, Guadalajara" },
  { id: "M76", matchNumber: 76,  stage: "R32", homePlaceholder: "1C", awayPlaceholder: "2F",             status: "NOT_STARTED", date: "2026-06-29", venue: "NRG Stadium, Houston" },
  { id: "M77", matchNumber: 77,  stage: "R32", homePlaceholder: "1I", awayPlaceholder: "Best 3rd (C/D/F/G/H)", status: "NOT_STARTED", date: "2026-06-30", venue: "MetLife Stadium, New York/NJ" },
  { id: "M78", matchNumber: 78,  stage: "R32", homePlaceholder: "2E", awayPlaceholder: "2I",             status: "NOT_STARTED", date: "2026-06-30", venue: "AT&T Stadium, Dallas" },
  { id: "M79", matchNumber: 79,  stage: "R32", homePlaceholder: "1A", awayPlaceholder: "Best 3rd (C/E/F/H/I)", status: "NOT_STARTED", date: "2026-07-01", venue: "Estadio Azteca, Mexico City" },
  { id: "M80", matchNumber: 80,  stage: "R32", homePlaceholder: "1L", awayPlaceholder: "Best 3rd (E/H/I/J/K)", status: "NOT_STARTED", date: "2026-07-01", venue: "Mercedes-Benz Stadium, Atlanta" },
  { id: "M81", matchNumber: 81,  stage: "R32", homePlaceholder: "1D", awayPlaceholder: "Best 3rd (B/E/F/I/J)", status: "NOT_STARTED", date: "2026-07-02", venue: "Levi's Stadium, San Francisco" },
  { id: "M82", matchNumber: 82,  stage: "R32", homePlaceholder: "1G", awayPlaceholder: "Best 3rd (A/E/H/I/J)", status: "NOT_STARTED", date: "2026-07-01", venue: "Lumen Field, Seattle" },
  { id: "M83", matchNumber: 83,  stage: "R32", homePlaceholder: "2K", awayPlaceholder: "2L",             status: "NOT_STARTED", date: "2026-07-03", venue: "BMO Field, Toronto" },
  { id: "M84", matchNumber: 84,  stage: "R32", homePlaceholder: "1H", awayPlaceholder: "2J",             status: "NOT_STARTED", date: "2026-07-02", venue: "SoFi Stadium, Los Angeles" },
  { id: "M85", matchNumber: 85,  stage: "R32", homePlaceholder: "1B", awayPlaceholder: "Best 3rd (E/F/G/I/J)", status: "NOT_STARTED", date: "2026-07-03", venue: "BC Place, Vancouver" },
  { id: "M86", matchNumber: 86,  stage: "R32", homePlaceholder: "1J", awayPlaceholder: "2H",             status: "NOT_STARTED", date: "2026-07-03", venue: "Hard Rock Stadium, Miami" },
  { id: "M87", matchNumber: 87,  stage: "R32", homePlaceholder: "1K", awayPlaceholder: "Best 3rd (D/E/I/J/L)", status: "NOT_STARTED", date: "2026-07-04", venue: "Arrowhead Stadium, Kansas City" },
  { id: "M88", matchNumber: 88,  stage: "R32", homePlaceholder: "2D", awayPlaceholder: "2G",             status: "NOT_STARTED", date: "2026-07-03", venue: "AT&T Stadium, Dallas" },

  // ══ ROUND OF 16 ══
  { id: "M89", matchNumber: 89,  stage: "R16", homePlaceholder: "W M74", awayPlaceholder: "W M77", status: "NOT_STARTED", date: "2026-07-04", venue: "Lincoln Financial Field, Philadelphia" },
  { id: "M90", matchNumber: 90,  stage: "R16", homePlaceholder: "W M73", awayPlaceholder: "W M75", status: "NOT_STARTED", date: "2026-07-04", venue: "NRG Stadium, Houston" },
  { id: "M91", matchNumber: 91,  stage: "R16", homePlaceholder: "W M76", awayPlaceholder: "W M78", status: "NOT_STARTED", date: "2026-07-05", venue: "MetLife Stadium, New York/NJ" },
  { id: "M92", matchNumber: 92,  stage: "R16", homePlaceholder: "W M79", awayPlaceholder: "W M80", status: "NOT_STARTED", date: "2026-07-06", venue: "Estadio Azteca, Mexico City" },
  { id: "M93", matchNumber: 93,  stage: "R16", homePlaceholder: "W M83", awayPlaceholder: "W M84", status: "NOT_STARTED", date: "2026-07-06", venue: "AT&T Stadium, Dallas" },
  { id: "M94", matchNumber: 94,  stage: "R16", homePlaceholder: "W M81", awayPlaceholder: "W M82", status: "NOT_STARTED", date: "2026-07-07", venue: "Lumen Field, Seattle" },
  { id: "M95", matchNumber: 95,  stage: "R16", homePlaceholder: "W M86", awayPlaceholder: "W M88", status: "NOT_STARTED", date: "2026-07-07", venue: "Mercedes-Benz Stadium, Atlanta" },
  { id: "M96", matchNumber: 96,  stage: "R16", homePlaceholder: "W M85", awayPlaceholder: "W M87", status: "NOT_STARTED", date: "2026-07-07", venue: "BC Place, Vancouver" },

  // ══ QUARTER-FINALS ══
  { id: "M97",  matchNumber: 97,  stage: "QF", homePlaceholder: "W M89", awayPlaceholder: "W M90", status: "NOT_STARTED", date: "2026-07-09", venue: "Gillette Stadium, Boston" },
  { id: "M98",  matchNumber: 98,  stage: "QF", homePlaceholder: "W M93", awayPlaceholder: "W M94", status: "NOT_STARTED", date: "2026-07-10", venue: "SoFi Stadium, Los Angeles" },
  { id: "M99",  matchNumber: 99,  stage: "QF", homePlaceholder: "W M91", awayPlaceholder: "W M92", status: "NOT_STARTED", date: "2026-07-11", venue: "Hard Rock Stadium, Miami" },
  { id: "M100", matchNumber: 100, stage: "QF", homePlaceholder: "W M95", awayPlaceholder: "W M96", status: "NOT_STARTED", date: "2026-07-12", venue: "Arrowhead Stadium, Kansas City" },

  // ══ SEMI-FINALS ══
  { id: "M101", matchNumber: 101, stage: "SF", homePlaceholder: "W M97", awayPlaceholder: "W M98", status: "NOT_STARTED", date: "2026-07-14", venue: "AT&T Stadium, Dallas" },
  { id: "M102", matchNumber: 102, stage: "SF", homePlaceholder: "W M99", awayPlaceholder: "W M100", status: "NOT_STARTED", date: "2026-07-15", venue: "Mercedes-Benz Stadium, Atlanta" },

  // ══ THIRD PLACE ══
  { id: "M103", matchNumber: 103, stage: "THIRD_PLACE", homePlaceholder: "L M101", awayPlaceholder: "L M102", status: "NOT_STARTED", date: "2026-07-18", venue: "Hard Rock Stadium, Miami" },

  // ══ FINAL ══
  { id: "M104", matchNumber: 104, stage: "FINAL", homePlaceholder: "W M101", awayPlaceholder: "W M102", status: "NOT_STARTED", date: "2026-07-19", venue: "MetLife Stadium, New York/NJ" },
];

export const fixtures: Match[] = [...groupFixtures, ...knockoutFixtures];

export const fixturesMap: Record<string, Match> = Object.fromEntries(
  fixtures.map((f) => [f.id, f])
);
