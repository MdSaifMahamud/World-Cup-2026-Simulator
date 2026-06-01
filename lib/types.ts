export type GroupId =
  | "A" | "B" | "C" | "D" | "E" | "F"
  | "G" | "H" | "I" | "J" | "K" | "L";

export type Stage =
  | "GROUP"
  | "R32"
  | "R16"
  | "QF"
  | "SF"
  | "THIRD_PLACE"
  | "FINAL";

export type MatchStatus = "NOT_STARTED" | "COMPLETED";
export type DecidedBy = "REGULAR_TIME" | "EXTRA_TIME" | "PENALTIES" | null;
export type QualificationStatus = "QUALIFIED" | "POSSIBLE" | "ELIMINATED";
export type SimulationRandomness = "LOW" | "MEDIUM" | "HIGH";

export interface Team {
  id: string;
  name: string;
  shortName: string;
  group: GroupId;
  isoCode: string;     // ISO 3166-1 alpha-2 (e.g. "fr") or subdivision (e.g. "gb-eng")
  flagEmoji?: string;  // kept as fallback for text contexts
  rating: number;
}

export interface Match {
  id: string;
  matchNumber: number;
  stage: Stage;
  group?: GroupId;
  homeTeamId?: string;
  awayTeamId?: string;
  homePlaceholder?: string;
  awayPlaceholder?: string;
  homeScore?: number | null;
  awayScore?: number | null;
  status: MatchStatus;
  winnerTeamId?: string | null;
  loserTeamId?: string | null;
  decidedBy?: DecidedBy;
  date?: string;
  time?: string;
  venue?: string;
}

export interface StandingRow {
  teamId: string;
  group: GroupId;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  rank: number;
  status?: QualificationStatus;
}

export interface SimulatedResult {
  homeScore: number;
  awayScore: number;
  winnerTeamId: string | null;
  decidedBy: DecidedBy;
}

export interface GroupData {
  groupId: GroupId;
  teamIds: string[];
}

export interface TournamentResults {
  champion?: string | null;
  runnerUp?: string | null;
  thirdPlace?: string | null;
}
