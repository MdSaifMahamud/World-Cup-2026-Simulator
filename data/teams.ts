import type { Team } from "@/lib/types";

// Official 48 teams from the 2026 FIFA World Cup draw (December 5, 2025)
// isoCode: ISO 3166-1 alpha-2 used by flagcdn.com (subdivisions: gb-eng, gb-sct)
// rating:  approximate FIFA ranking strength for simulation
export const teams: Team[] = [
  // ── GROUP A ── (Host: Mexico)
  { id: "mex", name: "Mexico",         shortName: "MEX", group: "A", isoCode: "mx", flagEmoji: "🇲🇽", rating: 78 },
  { id: "kor", name: "South Korea",    shortName: "KOR", group: "A", isoCode: "kr", flagEmoji: "🇰🇷", rating: 76 },
  { id: "rsa", name: "South Africa",   shortName: "RSA", group: "A", isoCode: "za", flagEmoji: "🇿🇦", rating: 66 },
  { id: "cze", name: "Czech Republic", shortName: "CZE", group: "A", isoCode: "cz", flagEmoji: "🇨🇿", rating: 64 },

  // ── GROUP B ── (Host: Canada)
  { id: "can", name: "Canada",                  shortName: "CAN", group: "B", isoCode: "ca", flagEmoji: "🇨🇦", rating: 70 },
  { id: "swi", name: "Switzerland",             shortName: "SUI", group: "B", isoCode: "ch", flagEmoji: "🇨🇭", rating: 75 },
  { id: "qat", name: "Qatar",                   shortName: "QAT", group: "B", isoCode: "qa", flagEmoji: "🇶🇦", rating: 63 },
  { id: "bih", name: "Bosnia & Herzegovina",    shortName: "BIH", group: "B", isoCode: "ba", flagEmoji: "🇧🇦", rating: 66 },

  // ── GROUP C ──
  { id: "bra", name: "Brazil",   shortName: "BRA", group: "C", isoCode: "br", flagEmoji: "🇧🇷", rating: 89 },
  { id: "mor", name: "Morocco",  shortName: "MAR", group: "C", isoCode: "ma", flagEmoji: "🇲🇦", rating: 80 },
  { id: "sco", name: "Scotland", shortName: "SCO", group: "C", isoCode: "gb-sct",               rating: 72 },
  { id: "hai", name: "Haiti",    shortName: "HAI", group: "C", isoCode: "ht", flagEmoji: "🇭🇹", rating: 60 },

  // ── GROUP D ── (Host: USA)
  { id: "usa", name: "United States", shortName: "USA", group: "D", isoCode: "us", flagEmoji: "🇺🇸", rating: 81 },
  { id: "aus", name: "Australia",     shortName: "AUS", group: "D", isoCode: "au", flagEmoji: "🇦🇺", rating: 73 },
  { id: "par", name: "Paraguay",      shortName: "PAR", group: "D", isoCode: "py", flagEmoji: "🇵🇾", rating: 68 },
  { id: "tur", name: "Turkey",        shortName: "TUR", group: "D", isoCode: "tr", flagEmoji: "🇹🇷", rating: 73 },

  // ── GROUP E ──
  { id: "ger", name: "Germany",     shortName: "GER", group: "E", isoCode: "de", flagEmoji: "🇩🇪", rating: 88 },
  { id: "ecu", name: "Ecuador",     shortName: "ECU", group: "E", isoCode: "ec", flagEmoji: "🇪🇨", rating: 75 },
  { id: "civ", name: "Ivory Coast", shortName: "CIV", group: "E", isoCode: "ci", flagEmoji: "🇨🇮", rating: 70 },
  { id: "cur", name: "Curaçao",     shortName: "CUW", group: "E", isoCode: "cw", flagEmoji: "🇨🇼", rating: 58 },

  // ── GROUP F ──
  { id: "ned", name: "Netherlands", shortName: "NED", group: "F", isoCode: "nl", flagEmoji: "🇳🇱", rating: 87 },
  { id: "jap", name: "Japan",       shortName: "JPN", group: "F", isoCode: "jp", flagEmoji: "🇯🇵", rating: 82 },
  { id: "tun", name: "Tunisia",     shortName: "TUN", group: "F", isoCode: "tn", flagEmoji: "🇹🇳", rating: 68 },
  { id: "swe", name: "Sweden",      shortName: "SWE", group: "F", isoCode: "se", flagEmoji: "🇸🇪", rating: 70 },

  // ── GROUP G ──
  { id: "bel", name: "Belgium",     shortName: "BEL", group: "G", isoCode: "be", flagEmoji: "🇧🇪", rating: 84 },
  { id: "irn", name: "Iran",        shortName: "IRN", group: "G", isoCode: "ir", flagEmoji: "🇮🇷", rating: 72 },
  { id: "egy", name: "Egypt",       shortName: "EGY", group: "G", isoCode: "eg", flagEmoji: "🇪🇬", rating: 68 },
  { id: "nzl", name: "New Zealand", shortName: "NZL", group: "G", isoCode: "nz", flagEmoji: "🇳🇿", rating: 61 },

  // ── GROUP H ──
  { id: "esp", name: "Spain",        shortName: "ESP", group: "H", isoCode: "es", flagEmoji: "🇪🇸", rating: 91 },
  { id: "uru", name: "Uruguay",      shortName: "URU", group: "H", isoCode: "uy", flagEmoji: "🇺🇾", rating: 82 },
  { id: "ksa", name: "Saudi Arabia", shortName: "KSA", group: "H", isoCode: "sa", flagEmoji: "🇸🇦", rating: 64 },
  { id: "cpv", name: "Cape Verde",   shortName: "CPV", group: "H", isoCode: "cv", flagEmoji: "🇨🇻", rating: 64 },

  // ── GROUP I ──
  { id: "fra", name: "France",  shortName: "FRA", group: "I", isoCode: "fr", flagEmoji: "🇫🇷", rating: 92 },
  { id: "sen", name: "Senegal", shortName: "SEN", group: "I", isoCode: "sn", flagEmoji: "🇸🇳", rating: 78 },
  { id: "nor", name: "Norway",  shortName: "NOR", group: "I", isoCode: "no", flagEmoji: "🇳🇴", rating: 74 },
  { id: "irq", name: "Iraq",    shortName: "IRQ", group: "I", isoCode: "iq", flagEmoji: "🇮🇶", rating: 62 },

  // ── GROUP J ──
  { id: "arg", name: "Argentina", shortName: "ARG", group: "J", isoCode: "ar", flagEmoji: "🇦🇷", rating: 94 },
  { id: "aut", name: "Austria",   shortName: "AUT", group: "J", isoCode: "at", flagEmoji: "🇦🇹", rating: 72 },
  { id: "alg", name: "Algeria",   shortName: "ALG", group: "J", isoCode: "dz", flagEmoji: "🇩🇿", rating: 69 },
  { id: "jor", name: "Jordan",    shortName: "JOR", group: "J", isoCode: "jo", flagEmoji: "🇯🇴", rating: 62 },

  // ── GROUP K ──
  { id: "por", name: "Portugal",   shortName: "POR", group: "K", isoCode: "pt", flagEmoji: "🇵🇹", rating: 86 },
  { id: "col", name: "Colombia",   shortName: "COL", group: "K", isoCode: "co", flagEmoji: "🇨🇴", rating: 80 },
  { id: "uzb", name: "Uzbekistan", shortName: "UZB", group: "K", isoCode: "uz", flagEmoji: "🇺🇿", rating: 63 },
  { id: "cod", name: "DR Congo",   shortName: "COD", group: "K", isoCode: "cd", flagEmoji: "🇨🇩", rating: 65 },

  // ── GROUP L ──
  { id: "eng", name: "England", shortName: "ENG", group: "L", isoCode: "gb-eng",               rating: 90 },
  { id: "cro", name: "Croatia", shortName: "CRO", group: "L", isoCode: "hr", flagEmoji: "🇭🇷", rating: 78 },
  { id: "pan", name: "Panama",  shortName: "PAN", group: "L", isoCode: "pa", flagEmoji: "🇵🇦", rating: 65 },
  { id: "gha", name: "Ghana",   shortName: "GHA", group: "L", isoCode: "gh", flagEmoji: "🇬🇭", rating: 65 },
];

export const teamsMap: Record<string, Team> = Object.fromEntries(
  teams.map((t) => [t.id, t])
);
