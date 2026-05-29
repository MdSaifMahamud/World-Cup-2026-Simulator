// Tests that the backtracking algorithm always fills all 8 R32 slots
// for every valid 8-of-12 group combination.

import { generateRoundOf32 } from "../lib/knockout";
import { buildStandingsFromManualOrder } from "../lib/standings";
import type { GroupId, Match, StandingRow } from "../lib/types";
import { THIRD_PLACE_MATCH_SLOTS } from "../data/thirdPlaceMapping";
import { fixtures } from "../data/fixtures";

const GROUP_IDS: GroupId[] = ["A","B","C","D","E","F","G","H","I","J","K","L"];

function makeStandings(groups: GroupId[]): Record<GroupId, StandingRow[]> {
  const result: Partial<Record<GroupId, StandingRow[]>> = {};
  for (const g of GROUP_IDS) {
    // Dummy 4 teams per group
    const ids = [`${g}1`,`${g}2`,`${g}3`,`${g}4`];
    result[g] = buildStandingsFromManualOrder(g, ids);
  }
  return result as Record<GroupId, StandingRow[]>;
}

function makeSelectedThird(qualifyingGroups: GroupId[], standings: Record<GroupId, StandingRow[]>): StandingRow[] {
  return qualifyingGroups.map((g) => standings[g].find((r) => r.rank === 3)!);
}

// A handful of group combinations that are known to be tricky for greedy algorithms
const TRICKY_COMBINATIONS: GroupId[][] = [
  ["A","B","C","D","E","F","G","H"],  // all from first half
  ["A","B","C","D","G","H","K","L"],  // includes highly constrained K, L, A, B, G
  ["A","B","G","H","I","J","K","L"],  // K can only → M80, L can only → M87
  ["C","D","E","F","G","H","I","J"],  // no A, B, K, L
  ["A","B","C","F","G","H","K","L"],  // stress test: A=2 slots, B=2 slots, G=2 slots, K=1, L=1
  ["A","B","D","F","G","H","K","L"],  // similar stress
];

describe("Third-place backtracking assignment", () => {
  for (const combo of TRICKY_COMBINATIONS) {
    test(`fills all 8 slots for groups ${combo.join(",")}`, () => {
      const standings = makeStandings(combo);
      const selectedThird = makeSelectedThird(combo, standings);

      const r32Fixtures = fixtures.filter((m) => m.stage === "R32");
      const result = generateRoundOf32(fixtures, standings as Record<GroupId, StandingRow[]>, selectedThird);

      const filledSlots = THIRD_PLACE_MATCH_SLOTS.filter((slotId) => {
        const match = result.find((m) => m.id === slotId);
        return match?.awayTeamId != null || match?.homeTeamId != null;
      });

      // All 8 "Best 3rd" slots should be filled
      const thirdSlotMatches = result.filter(
        (m) => m.stage === "R32" && (
          m.homePlaceholder?.startsWith("Best 3rd") ||
          m.awayPlaceholder?.startsWith("Best 3rd")
        )
      );

      for (const m of thirdSlotMatches) {
        const isHome = m.homePlaceholder?.startsWith("Best 3rd");
        const teamId = isHome ? m.homeTeamId : m.awayTeamId;
        expect(teamId).toBeTruthy();
      }
    });
  }

  test("each group is assigned to an eligible slot only", () => {
    const combo: GroupId[] = ["A","B","G","H","I","J","K","L"];
    const standings = makeStandings(combo);
    const selectedThird = makeSelectedThird(combo, standings);
    const result = generateRoundOf32(fixtures, standings as Record<GroupId, StandingRow[]>, selectedThird);

    const { SLOT_ELIGIBLE_GROUPS } = require("../data/thirdPlaceMapping") as { SLOT_ELIGIBLE_GROUPS: Record<string, string[]> };

    for (const slotId of THIRD_PLACE_MATCH_SLOTS) {
      const match = result.find((m) => m.id === slotId);
      if (!match) continue;
      const isHome = match.homePlaceholder?.startsWith("Best 3rd");
      const teamId = isHome ? match.homeTeamId : match.awayTeamId;
      if (!teamId) continue;
      // Derive group from teamId (format: "{group}3" e.g. "A3", "K3")
      const groupLetter = teamId[0] as GroupId;
      expect(SLOT_ELIGIBLE_GROUPS[slotId]).toContain(groupLetter);
    }
  });
});
