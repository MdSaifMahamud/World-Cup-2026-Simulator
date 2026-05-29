import { getBestThirdPlacedTeams } from "../lib/thirdPlace";
import type { GroupId, StandingRow, Team } from "../lib/types";

function makeRow(teamId: string, group: GroupId, points: number, gd: number, gf: number): StandingRow {
  return { teamId, group, played: 3, won: 0, drawn: 0, lost: 0, goalsFor: gf, goalsAgainst: gf - gd, goalDifference: gd, points, rank: 3 };
}

const teams: Team[] = Array.from({ length: 12 }, (_, i) => ({
  id: `3rd${i}`,
  name: `Team ${i}`,
  shortName: `T${i}`,
  group: String.fromCharCode(65 + i) as GroupId,
  rating: 70 + i,
}));

const GROUP_IDS: GroupId[] = ["A","B","C","D","E","F","G","H","I","J","K","L"];

function makeAllStandings(rows: StandingRow[]): Record<GroupId, StandingRow[]> {
  const map: Partial<Record<GroupId, StandingRow[]>> = {};
  for (const g of GROUP_IDS) {
    const row = rows.find((r) => r.group === g);
    if (row) map[g] = [{ ...row, rank: 1 }, { ...row, teamId: row.teamId + "_2", rank: 2 }, { ...row, rank: 3 }];
    else map[g] = [];
  }
  return map as Record<GroupId, StandingRow[]>;
}

describe("getBestThirdPlacedTeams", () => {
  it("returns exactly 12 third-placed teams when all groups complete", () => {
    const rows = GROUP_IDS.map((g, i) => makeRow(`3rd${i}`, g, 4, 1, 3));
    const standings = makeAllStandings(rows);
    const result = getBestThirdPlacedTeams(standings, teams);
    expect(result.length).toBe(12);
  });

  it("marks top 8 as POSSIBLE and bottom 4 as ELIMINATED", () => {
    const rows = GROUP_IDS.map((g, i) => makeRow(`3rd${i}`, g, i, i, i + 3));
    const standings = makeAllStandings(rows);
    const result = getBestThirdPlacedTeams(standings, teams);
    expect(result.slice(0, 8).every((r) => r.status === "POSSIBLE")).toBe(true);
    expect(result.slice(8).every((r) => r.status === "ELIMINATED")).toBe(true);
  });

  it("sorts by points descending first", () => {
    const rows = GROUP_IDS.map((g, i) => makeRow(`3rd${i}`, g, 12 - i, 0, 3));
    const standings = makeAllStandings(rows);
    const result = getBestThirdPlacedTeams(standings, teams);
    expect(result[0].teamId).toBe("3rd0"); // highest points
  });

  it("uses goal difference as secondary tiebreaker", () => {
    const rows = GROUP_IDS.map((g, i) => makeRow(`3rd${i}`, g, 4, i, 5));
    const standings = makeAllStandings(rows);
    const result = getBestThirdPlacedTeams(standings, teams);
    // team with highest GD should rank first
    expect(result[0].goalDifference).toBeGreaterThanOrEqual(result[1].goalDifference);
  });
});
