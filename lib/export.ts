import type { GroupId, Match, StandingRow } from "./types";

export function exportAsJSON(
  fixtures: Match[],
  standings: Record<GroupId, StandingRow[]>,
  manualGroupOrders: Record<GroupId, string[] | null>
): void {
  const data = { exportedAt: new Date().toISOString(), fixtures, standings, manualGroupOrders };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  downloadBlob(blob, "wf2026_simulation.json");
}

export function exportGroupsAsCSV(standings: Record<GroupId, StandingRow[]>): void {
  const header = "Group,Rank,TeamId,Status\n";
  const rows = Object.entries(standings)
    .flatMap(([group, rows]) =>
      rows.map((r) =>
        [group, r.rank, r.teamId, r.status].join(",")
      )
    )
    .join("\n");
  const blob = new Blob([header + rows], { type: "text/csv" });
  downloadBlob(blob, "wf2026_groups.csv");
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseImportedJSON(raw: string): {
  fixtures: Match[];
  manualGroupOrders?: Record<GroupId, string[] | null>;
} | null {
  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data.fixtures)) return null;
    return {
      fixtures: data.fixtures as Match[],
      manualGroupOrders: data.manualGroupOrders,
    };
  } catch {
    return null;
  }
}
