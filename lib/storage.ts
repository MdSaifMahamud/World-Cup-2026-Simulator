import type { GroupId, Match } from "./types";

const STORAGE_KEY = "wf2026_simulation";

export interface SavedState {
  fixtures: Match[];
  manualGroupOrders: Record<GroupId, string[] | null>;
  selectedThirdPlaceTeamIds: string[];
  thirdPlaceConfirmed: boolean;
  randomness: string;
  savedAt: string;
}

export function saveToStorage(state: SavedState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage quota exceeded — silently ignore
  }
}

export function loadFromStorage(): SavedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedState) : null;
  } catch {
    return null;
  }
}

export function clearStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
