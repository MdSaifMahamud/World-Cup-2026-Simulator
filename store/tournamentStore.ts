"use client";
import { create } from "zustand";
import { fixtures as initialFixtures } from "@/data/fixtures";
import { teams } from "@/data/teams";
import { groupsMap } from "@/data/groups";
import { calculateAllStandings } from "@/lib/standings";
import { getBestThirdPlacedTeams } from "@/lib/thirdPlace";
import { generateRoundOf32, advanceKnockoutWinner, clearKnockoutMatch } from "@/lib/knockout";
import { saveToStorage, loadFromStorage, clearStorage } from "@/lib/storage";
import { exportAsJSON, exportGroupsAsCSV, parseImportedJSON } from "@/lib/export";
import type {
  GroupId,
  Match,
  SimulationRandomness,
  Stage,
  StandingRow,
} from "@/lib/types";

const GROUP_IDS: GroupId[] = ["A","B","C","D","E","F","G","H","I","J","K","L"];

const initialManualGroupOrders: Record<GroupId, string[] | null> = Object.fromEntries(
  GROUP_IDS.map((g) => [g, null])
) as Record<GroupId, string[] | null>;

// ─────────────────────────────────────────────────────────
// Tournament phases:
//   GROUP_STAGE          — setting group positions
//   THIRD_PLACE_PICK     — all groups done, picking 8 of 12 third-place teams
//   KNOCKOUT             — 8 teams confirmed, bracket live
// ─────────────────────────────────────────────────────────
export type TournamentPhase = "GROUP_STAGE" | "THIRD_PLACE_PICK" | "KNOCKOUT";

interface TournamentState {
  fixtures: Match[];
  manualGroupOrders: Record<GroupId, string[] | null>;
  selectedThirdPlaceTeamIds: string[];  // the 8 user-chosen 3rd-place team IDs
  thirdPlaceConfirmed: boolean;          // true after user confirms selection
  randomness: SimulationRandomness;
  champion: string | null;
  runnerUp: string | null;
  thirdPlace: string | null;
  hasMappingWarning: boolean;

  standings: Record<GroupId, StandingRow[]>;
  bestThird: StandingRow[];             // all 12 ranked 3rd-place teams

  // Derived phase
  phase: TournamentPhase;

  // Group stage
  setGroupOrder: (groupId: GroupId, order: string[] | null) => void;
  simulateGroup: (groupId: GroupId) => void;
  simulateAllGroups: () => void;

  // Third-place selection
  setSelectedThirdPlaceTeamIds: (ids: string[]) => void;
  confirmThirdPlaceAndGenerateKnockout: () => void;

  // Knockout
  setKnockoutWinner: (matchId: string, winnerTeamId: string) => void;
  resetKnockoutMatch: (matchId: string) => void;
  simulateKnockoutMatch: (matchId: string) => void;
  simulateFullTournament: () => void;

  // Utility
  resetTournament: () => void;
  setRandomness: (r: SimulationRandomness) => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  exportAsJSON: () => void;
  exportCSV: () => void;
  importFromJSON: (raw: string) => boolean;
}

function computePhase(
  manualGroupOrders: Record<GroupId, string[] | null>,
  thirdPlaceConfirmed: boolean
): TournamentPhase {
  const allGroupsDone = GROUP_IDS.every((g) => manualGroupOrders[g] !== null);
  if (!allGroupsDone) return "GROUP_STAGE";
  if (!thirdPlaceConfirmed) return "THIRD_PLACE_PICK";
  return "KNOCKOUT";
}

function recomputeDerived(
  fixtures: Match[],
  manualGroupOrders: Record<GroupId, string[] | null>,
  thirdPlaceConfirmed: boolean
) {
  const standings = calculateAllStandings(fixtures, teams, manualGroupOrders);
  const bestThird = getBestThirdPlacedTeams(standings, teams);
  const phase = computePhase(manualGroupOrders, thirdPlaceConfirmed);
  return { standings, bestThird, phase };
}

function findChampion(fixtures: Match[]) {
  const final = fixtures.find((m) => m.id === "M104");
  const thirdMatch = fixtures.find((m) => m.id === "M103");
  return {
    champion: final?.status === "COMPLETED" ? (final.winnerTeamId ?? null) : null,
    runnerUp: final?.status === "COMPLETED" ? (final.loserTeamId ?? null) : null,
    thirdPlace: thirdMatch?.status === "COMPLETED" ? (thirdMatch.winnerTeamId ?? null) : null,
  };
}

function pickWinner(homeId: string, awayId: string, randomness: SimulationRandomness): string {
  const ht = teams.find((t) => t.id === homeId);
  const at = teams.find((t) => t.id === awayId);
  const noiseMap: Record<SimulationRandomness, number> = { LOW: 5, MEDIUM: 18, HIGH: 35 };
  const noise = noiseMap[randomness];
  const hs = (ht?.rating ?? 70) + (Math.random() - 0.5) * noise * 2;
  const as = (at?.rating ?? 70) + (Math.random() - 0.5) * noise * 2;
  return hs >= as ? homeId : awayId;
}

// Build StandingRow objects for the 8 selected third-place team IDs
function buildSelectedThirdRows(
  selectedIds: string[],
  standings: Record<GroupId, StandingRow[]>
): StandingRow[] {
  return selectedIds
    .map((id) => {
      for (const rows of Object.values(standings)) {
        const r = rows.find((r) => r.teamId === id && r.rank === 3);
        if (r) return r;
      }
      return null;
    })
    .filter((r): r is StandingRow => r !== null);
}

export const useTournamentStore = create<TournamentState>((set, get) => ({
  fixtures: initialFixtures,
  manualGroupOrders: initialManualGroupOrders,
  selectedThirdPlaceTeamIds: [],
  thirdPlaceConfirmed: false,
  randomness: "MEDIUM",
  champion: null,
  runnerUp: null,
  thirdPlace: null,
  hasMappingWarning: false,
  ...recomputeDerived(initialFixtures, initialManualGroupOrders, false),

  // ── Group Stage ───────────────────────────────────────────

  setGroupOrder(groupId, order) {
    const { fixtures, manualGroupOrders, thirdPlaceConfirmed, selectedThirdPlaceTeamIds } = get();
    const updated = { ...manualGroupOrders, [groupId]: order };
    const derived = recomputeDerived(fixtures, updated, thirdPlaceConfirmed);

    // When all 12 groups are confirmed for the first time, pre-populate the
    // top-8 third-place teams so the selector has a ready starting point.
    const allDone = GROUP_IDS.every((g) => updated[g] !== null);
    const autoIds =
      allDone && !thirdPlaceConfirmed && selectedThirdPlaceTeamIds.length === 0
        ? derived.bestThird.slice(0, 8).map((r) => r.teamId)
        : selectedThirdPlaceTeamIds;

    set({ manualGroupOrders: updated, ...derived, selectedThirdPlaceTeamIds: autoIds });
  },

  simulateGroup(groupId) {
    const { randomness } = get();
    const groupTeams = groupsMap[groupId].teamIds
      .map((id) => teams.find((t) => t.id === id))
      .filter(Boolean) as typeof teams;
    const noiseMap: Record<SimulationRandomness, number> = { LOW: 4, MEDIUM: 12, HIGH: 25 };
    const noise = noiseMap[randomness];
    const sorted = [...groupTeams].sort((a, b) => {
      const as = a.rating + (Math.random() - 0.5) * noise * 2;
      const bs = b.rating + (Math.random() - 0.5) * noise * 2;
      return bs - as;
    });
    get().setGroupOrder(groupId, sorted.map((t) => t.id));
  },

  simulateAllGroups() {
    for (const g of GROUP_IDS) get().simulateGroup(g);
  },

  // ── Third-Place Selection ──────────────────────────────────

  setSelectedThirdPlaceTeamIds(ids) {
    set({ selectedThirdPlaceTeamIds: ids });
  },

  confirmThirdPlaceAndGenerateKnockout() {
    // Read current state; selectedThirdPlaceTeamIds must already be synced
    // before calling this action.
    const { fixtures, standings, manualGroupOrders } = get();
    let { selectedThirdPlaceTeamIds } = get();

    const allGroupsDone = GROUP_IDS.every((g) => manualGroupOrders[g] !== null);
    if (!allGroupsDone) return;

    // Fallback: if nothing selected yet, auto-pick top-8
    if (selectedThirdPlaceTeamIds.length !== 8) {
      const auto = get().bestThird.slice(0, 8).map((r) => r.teamId);
      set({ selectedThirdPlaceTeamIds: auto });
      selectedThirdPlaceTeamIds = auto;
    }

    const selectedRows = buildSelectedThirdRows(selectedThirdPlaceTeamIds, standings);
    const r32Matches = generateRoundOf32(fixtures, standings, selectedRows);

    const qualifiedGroups = selectedRows.map((r) => r.group).sort().join(",");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { THIRD_PLACE_MAPPING } = require("@/data/thirdPlaceMapping") as { THIRD_PLACE_MAPPING: Record<string, Record<string, string>> };
    const hasMappingWarning = !THIRD_PLACE_MAPPING[qualifiedGroups];

    const derived = recomputeDerived(r32Matches, manualGroupOrders, true);
    set({ fixtures: r32Matches, thirdPlaceConfirmed: true, ...derived, hasMappingWarning });
  },

  // ── Knockout ──────────────────────────────────────────────

  setKnockoutWinner(matchId, winnerTeamId) {
    const { fixtures, manualGroupOrders, thirdPlaceConfirmed } = get();
    const match = fixtures.find((m) => m.id === matchId);
    if (!match) return;
    const loserTeamId = winnerTeamId === match.homeTeamId ? match.awayTeamId! : match.homeTeamId!;
    let updated = fixtures.map((m) =>
      m.id === matchId
        ? { ...m, status: "COMPLETED" as const, winnerTeamId, loserTeamId, decidedBy: null }
        : m
    );
    updated = advanceKnockoutWinner(matchId, winnerTeamId, loserTeamId, updated);
    const results = findChampion(updated);
    const derived = recomputeDerived(updated, manualGroupOrders, thirdPlaceConfirmed);
    set({ fixtures: updated, ...derived, ...results });
  },

  resetKnockoutMatch(matchId) {
    const { fixtures, manualGroupOrders, thirdPlaceConfirmed } = get();
    const updated = clearKnockoutMatch(matchId, fixtures);
    const results = findChampion(updated);
    const derived = recomputeDerived(updated, manualGroupOrders, thirdPlaceConfirmed);
    set({ fixtures: updated, ...derived, ...results });
  },

  simulateKnockoutMatch(matchId) {
    const { fixtures, randomness } = get();
    const match = fixtures.find((m) => m.id === matchId);
    if (!match || match.status === "COMPLETED" || !match.homeTeamId || !match.awayTeamId) return;
    const winnerId = pickWinner(match.homeTeamId, match.awayTeamId, randomness);
    get().setKnockoutWinner(matchId, winnerId);
  },

  simulateFullTournament() {
    // 1. Simulate all groups
    get().simulateAllGroups();

    // 2. Auto-select top 8 third-place teams and confirm
    const { bestThird } = get();
    const top8Ids = bestThird.slice(0, 8).map((r) => r.teamId);
    set({ selectedThirdPlaceTeamIds: top8Ids });
    get().confirmThirdPlaceAndGenerateKnockout();

    // 3. Simulate all knockout matches
    const stages: Stage[] = ["R32","R16","QF","SF","THIRD_PLACE","FINAL"];
    for (const stage of stages) {
      const pending = get().fixtures.filter(
        (m) => m.stage === stage && m.status === "NOT_STARTED"
      );
      for (const m of pending) get().simulateKnockoutMatch(m.id);
    }
  },

  // ── Utility ───────────────────────────────────────────────

  resetTournament() {
    clearStorage();
    const derived = recomputeDerived(initialFixtures, initialManualGroupOrders, false);
    set({
      fixtures: initialFixtures,
      manualGroupOrders: initialManualGroupOrders,
      selectedThirdPlaceTeamIds: [],
      thirdPlaceConfirmed: false,
      ...derived,
      champion: null,
      runnerUp: null,
      thirdPlace: null,
      hasMappingWarning: false,
    });
  },

  setRandomness(r) { set({ randomness: r }); },

  saveToLocalStorage() {
    const { fixtures, manualGroupOrders, selectedThirdPlaceTeamIds, thirdPlaceConfirmed, randomness } = get();
    saveToStorage({ fixtures, manualGroupOrders, selectedThirdPlaceTeamIds, thirdPlaceConfirmed, randomness, savedAt: new Date().toISOString() });
  },

  loadFromLocalStorage() {
    const saved = loadFromStorage();
    if (!saved) return;
    const mgo = (saved.manualGroupOrders as Record<GroupId, string[] | null>) ?? initialManualGroupOrders;
    const confirmed = (saved as { thirdPlaceConfirmed?: boolean }).thirdPlaceConfirmed ?? false;
    const selectedIds = (saved as { selectedThirdPlaceTeamIds?: string[] }).selectedThirdPlaceTeamIds ?? [];
    const derived = recomputeDerived(saved.fixtures, mgo, confirmed);
    const results = findChampion(saved.fixtures);
    set({ fixtures: saved.fixtures, manualGroupOrders: mgo, selectedThirdPlaceTeamIds: selectedIds, thirdPlaceConfirmed: confirmed, randomness: saved.randomness as SimulationRandomness, ...derived, ...results });
  },

  exportAsJSON() {
    const { fixtures, standings, manualGroupOrders } = get();
    exportAsJSON(fixtures, standings, manualGroupOrders);
  },

  exportCSV() {
    const { standings } = get();
    exportGroupsAsCSV(standings);
  },

  importFromJSON(raw) {
    const parsed = parseImportedJSON(raw);
    if (!parsed) return false;
    const mgo = parsed.manualGroupOrders ?? initialManualGroupOrders;
    const confirmed = false;
    const derived = recomputeDerived(parsed.fixtures, mgo, confirmed);
    const results = findChampion(parsed.fixtures);
    set({ fixtures: parsed.fixtures, manualGroupOrders: mgo, selectedThirdPlaceTeamIds: [], thirdPlaceConfirmed: confirmed, ...derived, ...results });
    return true;
  },
}));
