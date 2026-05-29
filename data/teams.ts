import type { Team } from "@/lib/types";

// Official 48 teams from the 2026 FIFA World Cup draw (December 5, 2025)
// Ratings are approximate FIFA ranking strengths for simulation use
export const teams: Team[] = [
  // ── GROUP A ── (Host: Mexico)
  { id: "mex", name: "Mexico",        shortName: "MEX", group: "A", flagEmoji: "🇲🇽", rating: 78 },
  { id: "kor", name: "South Korea",   shortName: "KOR", group: "A", flagEmoji: "🇰🇷", rating: 76 },
  { id: "rsa", name: "South Africa",  shortName: "RSA", group: "A", flagEmoji: "🇿🇦", rating: 66 },
  { id: "cze", name: "Czech Republic",shortName: "CZE", group: "A", flagEmoji: "🇨🇿", rating: 64 },

  // ── GROUP B ── (Host: Canada)
  { id: "can", name: "Canada",           shortName: "CAN", group: "B", flagEmoji: "🇨🇦", rating: 70 },
  { id: "swi", name: "Switzerland",      shortName: "SUI", group: "B", flagEmoji: "🇨🇭", rating: 75 },
  { id: "qat", name: "Qatar",            shortName: "QAT", group: "B", flagEmoji: "🇶🇦", rating: 63 },
  { id: "bih", name: "Bosnia & Herzegovina", shortName: "BIH", group: "B", flagEmoji: "🇧🇦", rating: 66 },

  // ── GROUP C ──
  { id: "bra", name: "Brazil",   shortName: "BRA", group: "C", flagEmoji: "🇧🇷", rating: 89 },
  { id: "mor", name: "Morocco",  shortName: "MAR", group: "C", flagEmoji: "🇲🇦", rating: 80 },
  { id: "sco", name: "Scotland", shortName: "SCO", group: "C", flagEmoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", rating: 72 },
  { id: "hai", name: "Haiti",    shortName: "HAI", group: "C", flagEmoji: "🇭🇹", rating: 60 },

  // ── GROUP D ── (Host: USA)
  { id: "usa", name: "United States", shortName: "USA", group: "D", flagEmoji: "🇺🇸", rating: 81 },
  { id: "aus", name: "Australia",     shortName: "AUS", group: "D", flagEmoji: "🇦🇺", rating: 73 },
  { id: "par", name: "Paraguay",      shortName: "PAR", group: "D", flagEmoji: "🇵🇾", rating: 68 },
  { id: "tur", name: "Turkey",        shortName: "TUR", group: "D", flagEmoji: "🇹🇷", rating: 73 },

  // ── GROUP E ──
  { id: "ger", name: "Germany",      shortName: "GER", group: "E", flagEmoji: "🇩🇪", rating: 88 },
  { id: "ecu", name: "Ecuador",      shortName: "ECU", group: "E", flagEmoji: "🇪🇨", rating: 75 },
  { id: "civ", name: "Ivory Coast",  shortName: "CIV", group: "E", flagEmoji: "🇨🇮", rating: 70 },
  { id: "cur", name: "Curaçao",      shortName: "CUW", group: "E", flagEmoji: "🇨🇼", rating: 58 },

  // ── GROUP F ──
  { id: "ned", name: "Netherlands", shortName: "NED", group: "F", flagEmoji: "🇳🇱", rating: 87 },
  { id: "jap", name: "Japan",       shortName: "JPN", group: "F", flagEmoji: "🇯🇵", rating: 82 },
  { id: "tun", name: "Tunisia",     shortName: "TUN", group: "F", flagEmoji: "🇹🇳", rating: 68 },
  { id: "swe", name: "Sweden",      shortName: "SWE", group: "F", flagEmoji: "🇸🇪", rating: 70 },

  // ── GROUP G ──
  { id: "bel", name: "Belgium",     shortName: "BEL", group: "G", flagEmoji: "🇧🇪", rating: 84 },
  { id: "irn", name: "Iran",        shortName: "IRN", group: "G", flagEmoji: "🇮🇷", rating: 72 },
  { id: "egy", name: "Egypt",       shortName: "EGY", group: "G", flagEmoji: "🇪🇬", rating: 68 },
  { id: "nzl", name: "New Zealand", shortName: "NZL", group: "G", flagEmoji: "🇳🇿", rating: 61 },

  // ── GROUP H ──
  { id: "esp", name: "Spain",       shortName: "ESP", group: "H", flagEmoji: "🇪🇸", rating: 91 },
  { id: "uru", name: "Uruguay",     shortName: "URU", group: "H", flagEmoji: "🇺🇾", rating: 82 },
  { id: "ksa", name: "Saudi Arabia",shortName: "KSA", group: "H", flagEmoji: "🇸🇦", rating: 64 },
  { id: "cpv", name: "Cape Verde",  shortName: "CPV", group: "H", flagEmoji: "🇨🇻", rating: 64 },

  // ── GROUP I ──
  { id: "fra", name: "France",  shortName: "FRA", group: "I", flagEmoji: "🇫🇷", rating: 92 },
  { id: "sen", name: "Senegal", shortName: "SEN", group: "I", flagEmoji: "🇸🇳", rating: 78 },
  { id: "nor", name: "Norway",  shortName: "NOR", group: "I", flagEmoji: "🇳🇴", rating: 74 },
  { id: "irq", name: "Iraq",    shortName: "IRQ", group: "I", flagEmoji: "🇮🇶", rating: 62 },

  // ── GROUP J ──
  { id: "arg", name: "Argentina", shortName: "ARG", group: "J", flagEmoji: "🇦🇷", rating: 94 },
  { id: "aut", name: "Austria",   shortName: "AUT", group: "J", flagEmoji: "🇦🇹", rating: 72 },
  { id: "alg", name: "Algeria",   shortName: "ALG", group: "J", flagEmoji: "🇩🇿", rating: 69 },
  { id: "jor", name: "Jordan",    shortName: "JOR", group: "J", flagEmoji: "🇯🇴", rating: 62 },

  // ── GROUP K ──
  { id: "por", name: "Portugal",  shortName: "POR", group: "K", flagEmoji: "🇵🇹", rating: 86 },
  { id: "col", name: "Colombia",  shortName: "COL", group: "K", flagEmoji: "🇨🇴", rating: 80 },
  { id: "uzb", name: "Uzbekistan",shortName: "UZB", group: "K", flagEmoji: "🇺🇿", rating: 63 },
  { id: "cod", name: "DR Congo",  shortName: "COD", group: "K", flagEmoji: "🇨🇩", rating: 65 },

  // ── GROUP L ──
  { id: "eng", name: "England",  shortName: "ENG", group: "L", flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", rating: 90 },
  { id: "cro", name: "Croatia",  shortName: "CRO", group: "L", flagEmoji: "🇭🇷", rating: 78 },
  { id: "pan", name: "Panama",   shortName: "PAN", group: "L", flagEmoji: "🇵🇦", rating: 65 },
  { id: "gha", name: "Ghana",    shortName: "GHA", group: "L", flagEmoji: "🇬🇭", rating: 65 },
];

export const teamsMap: Record<string, Team> = Object.fromEntries(
  teams.map((t) => [t.id, t])
);
