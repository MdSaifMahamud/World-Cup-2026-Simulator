import type { GroupId, StandingRow, Team } from "./types";

export function getBestThirdPlacedTeams(
  allStandings: Record<GroupId, StandingRow[]>,
  teams: Team[]
): StandingRow[] {
  const teamMap = Object.fromEntries(teams.map((t) => [t.id, t]));

  const thirdPlaced = Object.values(allStandings)
    .map((rows) => rows.find((r) => r.rank === 3))
    .filter((r): r is StandingRow => r !== undefined);

  const sorted = thirdPlaced.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    // Team rating as final tiebreaker
    return (teamMap[b.teamId]?.rating ?? 0) - (teamMap[a.teamId]?.rating ?? 0);
  });

  return sorted.map((row, idx) => ({
    ...row,
    status: idx < 8 ? "POSSIBLE" : "ELIMINATED",
  }));
}
