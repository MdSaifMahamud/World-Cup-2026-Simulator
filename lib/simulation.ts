import type { DecidedBy, SimulatedResult, SimulationRandomness, Stage, Team } from "./types";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function randomGoals(expected: number, spread: number): number {
  const raw = expected + (Math.random() - 0.5) * 2 * spread;
  return Math.max(0, Math.round(raw));
}

export function simulateMatch(
  homeTeam: Team,
  awayTeam: Team,
  stage: Stage,
  randomness: SimulationRandomness = "MEDIUM"
): SimulatedResult {
  const ratingDiff = homeTeam.rating - awayTeam.rating;
  const spreadMap: Record<SimulationRandomness, number> = {
    LOW: 0.5,
    MEDIUM: 1.2,
    HIGH: 2.2,
  };
  const spread = spreadMap[randomness];

  const baseHome = 1.3 + clamp(ratingDiff / 40, -0.8, 0.8);
  const baseAway = 1.0 - clamp(ratingDiff / 40, -0.8, 0.8);

  let homeScore = randomGoals(baseHome, spread);
  let awayScore = randomGoals(baseAway, spread);

  const isKnockout = stage !== "GROUP";

  if (isKnockout && homeScore === awayScore) {
    // Simulate extra time / penalties
    const homeWins = Math.random() < 0.5 + clamp(ratingDiff / 200, -0.2, 0.2);
    const decidedBy: DecidedBy = Math.random() < 0.4 ? "EXTRA_TIME" : "PENALTIES";
    if (decidedBy === "EXTRA_TIME") {
      if (homeWins) homeScore++;
      else awayScore++;
    }
    const winnerTeamId = homeWins ? homeTeam.id : awayTeam.id;
    const loserTeamId = homeWins ? awayTeam.id : homeTeam.id;
    return { homeScore, awayScore, winnerTeamId, decidedBy };
  }

  const winnerTeamId =
    homeScore > awayScore ? homeTeam.id : homeScore < awayScore ? awayTeam.id : null;
  const decidedBy: DecidedBy = winnerTeamId ? "REGULAR_TIME" : null;

  return { homeScore, awayScore, winnerTeamId, decidedBy };
}
