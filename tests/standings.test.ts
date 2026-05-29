import { calculateGroupStandings } from "../lib/standings";
import type { Match, Team } from "../lib/types";

const mockTeams: Team[] = [
  { id: "t1", name: "Team 1", shortName: "T1", group: "A", rating: 80 },
  { id: "t2", name: "Team 2", shortName: "T2", group: "A", rating: 75 },
  { id: "t3", name: "Team 3", shortName: "T3", group: "A", rating: 70 },
  { id: "t4", name: "Team 4", shortName: "T4", group: "A", rating: 65 },
];

function makeMatch(id: string, homeId: string, awayId: string, hs: number, as_: number): Match {
  return {
    id,
    matchNumber: parseInt(id.replace("M", "")),
    stage: "GROUP",
    group: "A",
    homeTeamId: homeId,
    awayTeamId: awayId,
    homeScore: hs,
    awayScore: as_,
    status: "COMPLETED",
  };
}

describe("calculateGroupStandings", () => {
  it("awards 3 points for a win", () => {
    const matches: Match[] = [makeMatch("M1", "t1", "t2", 2, 0)];
    const standings = calculateGroupStandings("A", matches, mockTeams);
    const t1 = standings.find((r) => r.teamId === "t1")!;
    expect(t1.points).toBe(3);
    expect(t1.won).toBe(1);
    expect(t1.lost).toBe(0);
  });

  it("awards 1 point each for a draw", () => {
    const matches: Match[] = [makeMatch("M1", "t1", "t2", 1, 1)];
    const standings = calculateGroupStandings("A", matches, mockTeams);
    const t1 = standings.find((r) => r.teamId === "t1")!;
    const t2 = standings.find((r) => r.teamId === "t2")!;
    expect(t1.points).toBe(1);
    expect(t2.points).toBe(1);
    expect(t1.drawn).toBe(1);
  });

  it("awards 0 points to loser", () => {
    const matches: Match[] = [makeMatch("M1", "t1", "t2", 0, 1)];
    const standings = calculateGroupStandings("A", matches, mockTeams);
    const t1 = standings.find((r) => r.teamId === "t1")!;
    expect(t1.points).toBe(0);
    expect(t1.lost).toBe(1);
  });

  it("calculates goal difference correctly", () => {
    const matches: Match[] = [makeMatch("M1", "t1", "t2", 3, 1)];
    const standings = calculateGroupStandings("A", matches, mockTeams);
    const t1 = standings.find((r) => r.teamId === "t1")!;
    expect(t1.goalDifference).toBe(2);
    expect(t1.goalsFor).toBe(3);
    expect(t1.goalsAgainst).toBe(1);
  });

  it("ranks teams by points descending", () => {
    const matches: Match[] = [
      makeMatch("M1", "t1", "t2", 2, 0),
      makeMatch("M2", "t3", "t4", 1, 1),
      makeMatch("M3", "t1", "t3", 1, 0),
      makeMatch("M4", "t2", "t4", 0, 0),
    ];
    const standings = calculateGroupStandings("A", matches, mockTeams);
    expect(standings[0].teamId).toBe("t1"); // 6 pts
    expect(standings[0].points).toBe(6);
  });

  it("assigns rank 1 and 2 as QUALIFIED, rank 3 as POSSIBLE, rank 4 as ELIMINATED", () => {
    const matches: Match[] = [
      makeMatch("M1", "t1", "t2", 2, 0),
      makeMatch("M2", "t3", "t4", 1, 0),
      makeMatch("M3", "t1", "t3", 2, 1),
      makeMatch("M4", "t2", "t4", 2, 0),
      makeMatch("M5", "t1", "t4", 1, 0),
      makeMatch("M6", "t2", "t3", 0, 1),
    ];
    const standings = calculateGroupStandings("A", matches, mockTeams);
    expect(standings[0].status).toBe("QUALIFIED");
    expect(standings[1].status).toBe("QUALIFIED");
    expect(standings[2].status).toBe("POSSIBLE");
    expect(standings[3].status).toBe("ELIMINATED");
  });

  it("counts played matches per team correctly", () => {
    const matches: Match[] = [
      makeMatch("M1", "t1", "t2", 1, 0),
      makeMatch("M2", "t1", "t3", 1, 0),
      makeMatch("M3", "t1", "t4", 1, 0),
    ];
    const standings = calculateGroupStandings("A", matches, mockTeams);
    const t1 = standings.find((r) => r.teamId === "t1")!;
    expect(t1.played).toBe(3);
    expect(t1.points).toBe(9);
  });
});
