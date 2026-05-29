import { advanceKnockoutWinner } from "../lib/knockout";
import type { Match } from "../lib/types";

function makeKnockoutMatch(id: string, matchNumber: number, stage: Match["stage"], homeId?: string, awayId?: string): Match {
  return {
    id,
    matchNumber,
    stage,
    homeTeamId: homeId,
    awayTeamId: awayId,
    status: "NOT_STARTED",
  };
}

const BRACKET: Match[] = [
  makeKnockoutMatch("M73", 73, "R32", "t1", "t2"),
  makeKnockoutMatch("M74", 74, "R32", "t3", "t4"),
  makeKnockoutMatch("M75", 75, "R32", "t5", "t6"),
  makeKnockoutMatch("M89", 89, "R16"),
  makeKnockoutMatch("M90", 90, "R16"),
  makeKnockoutMatch("M97", 97, "QF"),
  makeKnockoutMatch("M98", 98, "QF"),
  makeKnockoutMatch("M101", 101, "SF"),
  makeKnockoutMatch("M102", 102, "SF"),
  makeKnockoutMatch("M103", 103, "THIRD_PLACE"),
  makeKnockoutMatch("M104", 104, "FINAL"),
];

describe("advanceKnockoutWinner", () => {
  it("propagates R32 winner to R16 home slot for M74→M89", () => {
    const updated = advanceKnockoutWinner("M74", "t3", "t4", BRACKET);
    const m89 = updated.find((m) => m.id === "M89")!;
    expect(m89.homeTeamId).toBe("t3");
  });

  it("propagates R32 winner to R16 away slot for M77→M89", () => {
    const matches = [...BRACKET, makeKnockoutMatch("M77", 77, "R32", "t7", "t8")];
    const updated = advanceKnockoutWinner("M77", "t8", "t7", matches);
    const m89 = updated.find((m) => m.id === "M89")!;
    expect(m89.awayTeamId).toBe("t8");
  });

  it("propagates SF loser to third-place match home slot for M101", () => {
    const updated = advanceKnockoutWinner("M101", "winner1", "loser1", BRACKET);
    const m103 = updated.find((m) => m.id === "M103")!;
    expect(m103.homeTeamId).toBe("loser1");
  });

  it("propagates SF loser to third-place match away slot for M102", () => {
    const updated = advanceKnockoutWinner("M102", "winner2", "loser2", BRACKET);
    const m103 = updated.find((m) => m.id === "M103")!;
    expect(m103.awayTeamId).toBe("loser2");
  });

  it("propagates SF winner to Final for M101", () => {
    const updated = advanceKnockoutWinner("M101", "finalist1", "loser1", BRACKET);
    const m104 = updated.find((m) => m.id === "M104")!;
    expect(m104.homeTeamId).toBe("finalist1");
  });

  it("propagates SF winner to Final for M102", () => {
    const updated = advanceKnockoutWinner("M102", "finalist2", "loser2", BRACKET);
    const m104 = updated.find((m) => m.id === "M104")!;
    expect(m104.awayTeamId).toBe("finalist2");
  });

  it("does not mutate the input array", () => {
    const original = BRACKET.map((m) => ({ ...m }));
    advanceKnockoutWinner("M73", "t1", "t2", BRACKET);
    // check M90 in original is unchanged
    const m90_before = original.find((m) => m.id === "M90")!;
    const m90_bracket = BRACKET.find((m) => m.id === "M90")!;
    expect(m90_bracket.homeTeamId).toBe(m90_before.homeTeamId);
  });
});
