import type { GroupId, Match, QualificationStatus, StandingRow, Team } from "./types";

function buildEmptyRow(teamId: string, group: GroupId): StandingRow {
  return { teamId, group, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, rank: 0 };
}

function h2hCompare(
  teamIds: string[],
  matches: Match[]
): Record<string, { pts: number; gd: number; gf: number }> {
  const h2h: Record<string, { pts: number; gd: number; gf: number }> = {};
  for (const id of teamIds) h2h[id] = { pts: 0, gd: 0, gf: 0 };

  for (const m of matches) {
    if (m.status !== "COMPLETED") continue;
    if (!teamIds.includes(m.homeTeamId!) || !teamIds.includes(m.awayTeamId!)) continue;
    if (m.homeScore == null || m.awayScore == null) continue;
    const hs = m.homeScore;
    const as_ = m.awayScore;
    h2h[m.homeTeamId!].gf += hs;
    h2h[m.homeTeamId!].gd += hs - as_;
    h2h[m.awayTeamId!].gf += as_;
    h2h[m.awayTeamId!].gd += as_ - hs;
    if (hs > as_) { h2h[m.homeTeamId!].pts += 3; }
    else if (hs < as_) { h2h[m.awayTeamId!].pts += 3; }
    else { h2h[m.homeTeamId!].pts += 1; h2h[m.awayTeamId!].pts += 1; }
  }
  return h2h;
}

export function calculateGroupStandings(
  groupId: GroupId,
  matches: Match[],
  teams: Team[]
): StandingRow[] {
  const groupTeams = teams.filter((t) => t.group === groupId);
  const groupMatches = matches.filter((m) => m.group === groupId && m.stage === "GROUP");

  const rows: Record<string, StandingRow> = {};
  for (const t of groupTeams) rows[t.id] = buildEmptyRow(t.id, groupId);

  for (const m of groupMatches) {
    if (m.status !== "COMPLETED") continue;
    if (m.homeScore == null || m.awayScore == null) continue;
    const hs = m.homeScore;
    const as_ = m.awayScore;

    rows[m.homeTeamId!].played++;
    rows[m.homeTeamId!].goalsFor += hs;
    rows[m.homeTeamId!].goalsAgainst += as_;
    rows[m.homeTeamId!].goalDifference += hs - as_;

    rows[m.awayTeamId!].played++;
    rows[m.awayTeamId!].goalsFor += as_;
    rows[m.awayTeamId!].goalsAgainst += hs;
    rows[m.awayTeamId!].goalDifference += as_ - hs;

    if (hs > as_) {
      rows[m.homeTeamId!].won++;
      rows[m.homeTeamId!].points += 3;
      rows[m.awayTeamId!].lost++;
    } else if (hs < as_) {
      rows[m.awayTeamId!].won++;
      rows[m.awayTeamId!].points += 3;
      rows[m.homeTeamId!].lost++;
    } else {
      rows[m.homeTeamId!].drawn++;
      rows[m.homeTeamId!].points++;
      rows[m.awayTeamId!].drawn++;
      rows[m.awayTeamId!].points++;
    }
  }

  const sorted = Object.values(rows).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;

    const tied = Object.values(rows).filter(
      (r) =>
        r.points === a.points &&
        r.goalDifference === a.goalDifference &&
        r.goalsFor === a.goalsFor
    );
    if (tied.length > 1 && tied.length < Object.values(rows).length) {
      const tiedIds = tied.map((r) => r.teamId);
      const h2h = h2hCompare(tiedIds, groupMatches);
      if (h2h[b.teamId].pts !== h2h[a.teamId].pts) return h2h[b.teamId].pts - h2h[a.teamId].pts;
      if (h2h[b.teamId].gd !== h2h[a.teamId].gd) return h2h[b.teamId].gd - h2h[a.teamId].gd;
      if (h2h[b.teamId].gf !== h2h[a.teamId].gf) return h2h[b.teamId].gf - h2h[a.teamId].gf;
    }

    const teamMap = Object.fromEntries(teams.map((t) => [t.id, t]));
    return (teamMap[b.teamId]?.rating ?? 0) - (teamMap[a.teamId]?.rating ?? 0);
  });

  return sorted.map((row, idx) => ({
    ...row,
    rank: idx + 1,
    status: (idx === 0 || idx === 1 ? "QUALIFIED" : idx === 2 ? "POSSIBLE" : "ELIMINATED") as QualificationStatus,
  }));
}

// Build standings directly from a manually chosen order (no match data needed)
export function buildStandingsFromManualOrder(
  groupId: GroupId,
  orderedTeamIds: string[]
): StandingRow[] {
  const STATUS_MAP: QualificationStatus[] = ["QUALIFIED", "QUALIFIED", "POSSIBLE", "ELIMINATED"];
  return orderedTeamIds.map((teamId, idx) => ({
    teamId,
    group: groupId,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    rank: idx + 1,
    status: STATUS_MAP[idx] ?? "ELIMINATED",
  }));
}

export function calculateAllStandings(
  matches: Match[],
  teams: Team[],
  manualGroupOrders?: Record<GroupId, string[] | null>
): Record<GroupId, StandingRow[]> {
  const groups: GroupId[] = ["A","B","C","D","E","F","G","H","I","J","K","L"];
  return Object.fromEntries(
    groups.map((g) => {
      const manual = manualGroupOrders?.[g];
      if (manual && manual.length === 4) {
        return [g, buildStandingsFromManualOrder(g, manual)];
      }
      return [g, calculateGroupStandings(g, matches, teams)];
    })
  ) as Record<GroupId, StandingRow[]>;
}
