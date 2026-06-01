import type { GroupId, Match, StandingRow } from "./types";
import {
  THIRD_PLACE_MATCH_SLOTS,
  THIRD_PLACE_MAPPING,
  SLOT_ELIGIBLE_GROUPS,
} from "@/data/thirdPlaceMapping";

// Resolve a plain placeholder like "1A", "2B" → teamId
export function resolvePlaceholder(
  placeholder: string,
  standings: Record<GroupId, StandingRow[]>
): string | null {
  const m = placeholder.match(/^([123])([A-L])$/);
  if (!m) return null;
  const rank = parseInt(m[1]);
  const group = m[2] as GroupId;
  return standings[group]?.find((r) => r.rank === rank)?.teamId ?? null;
}

// Map 8 user-selected 3rd-place teams to the 8 R32 slots.
// Tries the official THIRD_PLACE_MAPPING table first.
// Falls back to backtracking constraint-satisfaction (always finds a valid assignment).
function assignThirdPlaceTeams(
  selectedThird: StandingRow[],
  standings: Record<GroupId, StandingRow[]>
): Record<string, string> {
  const qualifiedGroups = selectedThird.map((r) => r.group).sort().join(",");

  // 1. Official mapping table (exact 495-combination key)
  const officialMap = THIRD_PLACE_MAPPING[qualifiedGroups];
  if (officialMap) {
    const result: Record<string, string> = {};
    for (const [matchId, slot] of Object.entries(officialMap)) {
      const g = slot.replace("3", "") as GroupId;
      const teamId = standings[g]?.find((r) => r.rank === 3)?.teamId;
      if (teamId) result[matchId] = teamId;
    }
    return result;
  }

  // 2. Backtracking constraint-satisfaction fallback
  //
  // Eligibility rules (which groups can fill each R32 slot):
  //   M74: A B C D F      M77: C D F G H
  //   M79: C E F H I      M80: E H I J K
  //   M81: B E F I J      M82: A E H I J
  //   M85: E F G I J      M87: D E I J L
  //
  // Strategy: sort teams by number of eligible slots ascending
  // (most-constrained first), then backtrack on conflicts.
  // This guarantees a valid assignment exists for every legal combination.

  type TeamEntry = { group: string; teamId: string; eligible: string[] };

  const slotIds = [...THIRD_PLACE_MATCH_SLOTS] as string[];

  const entries: TeamEntry[] = selectedThird.map((row) => ({
    group: row.group,
    teamId: row.teamId,
    eligible: slotIds.filter((s) => SLOT_ELIGIBLE_GROUPS[s]?.includes(row.group)),
  }));

  // Most constrained (fewest eligible slots) first
  entries.sort((a, b) => a.eligible.length - b.eligible.length);

  const assignment: Record<string, string> = {};
  const usedSlots = new Set<string>();

  function backtrack(i: number): boolean {
    if (i === entries.length) return true;
    const { teamId, eligible } = entries[i];
    for (const slot of eligible) {
      if (usedSlots.has(slot)) continue;
      assignment[slot] = teamId;
      usedSlots.add(slot);
      if (backtrack(i + 1)) return true;
      delete assignment[slot];
      usedSlots.delete(slot);
    }
    return false; // no valid slot found for this team (shouldn't happen with valid input)
  }

  backtrack(0);
  return assignment;
}

// Generate the full Round of 32 match list with real team IDs filled in.
// selectedThirdPlace must be exactly 8 rows (user-confirmed).
export function generateRoundOf32(
  matches: Match[],
  standings: Record<GroupId, StandingRow[]>,
  selectedThirdPlace: StandingRow[]
): Match[] {
  const thirdAssignment = assignThirdPlaceTeams(selectedThirdPlace, standings);

  return matches.map((m) => {
    if (m.stage !== "R32") return m;
    if (m.status === "COMPLETED") return m;

    const resolveSlot = (placeholder: string | undefined): string | undefined => {
      if (!placeholder) return undefined;
      // "1A", "2B" etc.
      const direct = resolvePlaceholder(placeholder, standings);
      if (direct) return direct;
      // "Best 3rd …" slot
      if (placeholder.startsWith("Best 3rd") || placeholder.startsWith("3")) {
        return thirdAssignment[m.id];
      }
      return undefined;
    };

    const homeTeamId = resolveSlot(m.homePlaceholder);
    const awayTeamId = resolveSlot(m.awayPlaceholder);

    return {
      ...m,
      homeTeamId: homeTeamId ?? m.homeTeamId,
      awayTeamId: awayTeamId ?? m.awayTeamId,
    };
  });
}

// Bracket adjacency table
const NEXT_MATCH: Record<string, { matchId: string; slot: "home" | "away" }> = {
  M73: { matchId: "M90", slot: "home" },
  M74: { matchId: "M89", slot: "home" },
  M75: { matchId: "M90", slot: "away" },
  M76: { matchId: "M91", slot: "home" },
  M77: { matchId: "M89", slot: "away" },
  M78: { matchId: "M91", slot: "away" },
  M79: { matchId: "M92", slot: "home" },
  M80: { matchId: "M92", slot: "away" },
  M81: { matchId: "M94", slot: "home" },
  M82: { matchId: "M94", slot: "away" },
  M83: { matchId: "M93", slot: "home" },
  M84: { matchId: "M93", slot: "away" },
  M85: { matchId: "M96", slot: "home" },
  M86: { matchId: "M95", slot: "home" },
  M87: { matchId: "M96", slot: "away" },
  M88: { matchId: "M95", slot: "away" },
  M89: { matchId: "M97", slot: "home" },
  M90: { matchId: "M97", slot: "away" },
  M91: { matchId: "M99", slot: "home" },
  M92: { matchId: "M99", slot: "away" },
  M93: { matchId: "M98", slot: "home" },
  M94: { matchId: "M98", slot: "away" },
  M95: { matchId: "M100", slot: "home" },
  M96: { matchId: "M100", slot: "away" },
  M97: { matchId: "M101", slot: "home" },
  M98: { matchId: "M101", slot: "away" },
  M99: { matchId: "M102", slot: "home" },
  M100: { matchId: "M102", slot: "away" },
  M101: { matchId: "M104", slot: "home" },
  M102: { matchId: "M104", slot: "away" },
};

const LOSER_MATCH: Record<string, { matchId: string; slot: "home" | "away" }> = {
  M101: { matchId: "M103", slot: "home" },
  M102: { matchId: "M103", slot: "away" },
};

// Reset a completed knockout match and cascade-clear all downstream results.
// Uses BFS so clearing M73 (R32) also clears M90→M97→M101→M104 if they were played.
export function clearKnockoutMatch(startMatchId: string, allMatches: Match[]): Match[] {
  const updated = allMatches.map((m) => ({ ...m }));
  const queue = [startMatchId];

  while (queue.length > 0) {
    const matchId = queue.shift()!;
    const match = updated.find((m) => m.id === matchId);
    if (!match) continue;

    const prevWinnerId = match.winnerTeamId;
    const prevLoserId  = match.loserTeamId;

    // Reset this match
    match.status      = "NOT_STARTED";
    match.winnerTeamId = null;
    match.loserTeamId  = null;
    match.decidedBy    = null;

    // Clear winner from the next match slot
    const next = NEXT_MATCH[matchId];
    if (next && prevWinnerId) {
      const nextMatch = updated.find((m) => m.id === next.matchId);
      if (nextMatch) {
        const slotHeld =
          next.slot === "home"
            ? nextMatch.homeTeamId === prevWinnerId
            : nextMatch.awayTeamId === prevWinnerId;
        if (slotHeld) {
          if (next.slot === "home") nextMatch.homeTeamId = undefined;
          else nextMatch.awayTeamId = undefined;
          // Cascade if that match was already played
          if (nextMatch.status === "COMPLETED") queue.push(nextMatch.id);
        }
      }
    }

    // Clear loser from the 3rd-place match slot (SF only)
    const loserNext = LOSER_MATCH[matchId];
    if (loserNext && prevLoserId) {
      const loserMatch = updated.find((m) => m.id === loserNext.matchId);
      if (loserMatch) {
        const slotHeld =
          loserNext.slot === "home"
            ? loserMatch.homeTeamId === prevLoserId
            : loserMatch.awayTeamId === prevLoserId;
        if (slotHeld) {
          if (loserNext.slot === "home") loserMatch.homeTeamId = undefined;
          else loserMatch.awayTeamId = undefined;
          if (loserMatch.status === "COMPLETED") queue.push(loserMatch.id);
        }
      }
    }
  }

  return updated;
}

export function advanceKnockoutWinner(
  matchId: string,
  winnerTeamId: string,
  loserTeamId: string,
  allMatches: Match[]
): Match[] {
  const updated = allMatches.map((m) => ({ ...m }));

  const next = NEXT_MATCH[matchId];
  if (next) {
    const target = updated.find((m) => m.id === next.matchId);
    if (target) {
      if (next.slot === "home") target.homeTeamId = winnerTeamId;
      else target.awayTeamId = winnerTeamId;
    }
  }

  const loserNext = LOSER_MATCH[matchId];
  if (loserNext) {
    const target = updated.find((m) => m.id === loserNext.matchId);
    if (target) {
      if (loserNext.slot === "home") target.homeTeamId = loserTeamId;
      else target.awayTeamId = loserTeamId;
    }
  }

  return updated;
}
