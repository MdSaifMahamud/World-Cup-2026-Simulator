"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Match } from "@/lib/types";
import { teamsMap } from "@/data/teams";
import { useTournamentStore } from "@/store/tournamentStore";

// Maps each R32/R16/QF/SF match to the next match it feeds into
const ADVANCES_TO: Record<string, string> = {
  // R32 → R16
  M73: "M90", M74: "M89", M75: "M90", M76: "M91",
  M77: "M89", M78: "M91", M79: "M92", M80: "M92",
  M81: "M94", M82: "M94", M83: "M93", M84: "M93",
  M85: "M96", M86: "M95", M87: "M96", M88: "M95",
  // R16 → QF
  M89: "M97", M90: "M97", M91: "M99", M92: "M99",
  M93: "M98", M94: "M98", M95: "M100", M96: "M100",
  // QF → SF
  M97: "M101", M98: "M101", M99: "M102", M100: "M102",
  // SF → Final / 3rd Place
  M101: "M104", M102: "M104",
};

const STAGE_LABELS: Record<string, string> = {
  R32: "Round of 32",
  R16: "Round of 16",
  QF: "Quarter-Final",
  SF: "Semi-Final",
  THIRD_PLACE: "3rd Place",
  FINAL: "Final ⭐",
};

const STAGE_ACCENT: Record<string, string> = {
  R32: "border-l-slate-400",
  R16: "border-l-blue-400",
  QF: "border-l-purple-400",
  SF: "border-l-orange-400",
  THIRD_PLACE: "border-l-amber-500",
  FINAL: "border-l-yellow-400",
};

interface Props {
  match: Match;
}

export default function KnockoutMatchNode({ match }: Props) {
  const setKnockoutWinner = useTournamentStore((s) => s.setKnockoutWinner);
  const simulateKnockoutMatch = useTournamentStore((s) => s.simulateKnockoutMatch);

  const isCompleted = match.status === "COMPLETED";
  const hasTeams = !!match.homeTeamId && !!match.awayTeamId;
  const canPlay = !isCompleted && hasTeams;

  const homeTeam = match.homeTeamId ? teamsMap[match.homeTeamId] : null;
  const awayTeam = match.awayTeamId ? teamsMap[match.awayTeamId] : null;

  const advancesTo = ADVANCES_TO[match.id];
  const accent = STAGE_ACCENT[match.stage] ?? "border-l-border";

  function pickHome() {
    if (!canPlay || !match.homeTeamId) return;
    setKnockoutWinner(match.id, match.homeTeamId);
  }
  function pickAway() {
    if (!canPlay || !match.awayTeamId) return;
    setKnockoutWinner(match.id, match.awayTeamId);
  }

  const homeIsWinner = isCompleted && match.winnerTeamId === match.homeTeamId;
  const awayIsWinner = isCompleted && match.winnerTeamId === match.awayTeamId;
  const homeIsLoser  = isCompleted && !homeIsWinner && match.winnerTeamId != null;
  const awayIsLoser  = isCompleted && !awayIsWinner && match.winnerTeamId != null;

  return (
    <div className={`rounded-xl border-2 border-l-4 bg-card shadow-sm overflow-hidden ${accent} ${isCompleted ? "border-border/60" : "border-border"}`}>
      {/* ── Header ─────────────────────────────── */}
      <div className="flex items-center justify-between px-3 py-2 bg-muted/40 border-b gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-mono font-bold text-muted-foreground shrink-0">
            #{match.matchNumber}
          </span>
          <Badge variant="secondary" className="text-[10px] py-0 px-1.5 shrink-0">
            {STAGE_LABELS[match.stage]}
          </Badge>
        </div>
        {isCompleted && (
          <Badge variant="outline" className="text-[10px] py-0 px-1.5 text-green-600 border-green-500 shrink-0">
            Done ✓
          </Badge>
        )}
      </div>

      {/* ── Venue ──────────────────────────────── */}
      {match.venue && (
        <p className="px-3 pt-1.5 text-[11px] text-muted-foreground truncate">
          📍 {match.venue}
        </p>
      )}

      {/* ── Team rows ──────────────────────────── */}
      <div className="p-3 space-y-2">

        {/* HOME TEAM */}
        <button
          onClick={pickHome}
          disabled={!canPlay}
          title={canPlay ? `Pick ${homeTeam?.name ?? "home team"} as winner` : undefined}
          className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 border-2 transition-all text-left
            ${homeIsWinner
              ? "border-green-500 bg-green-50 dark:bg-green-950/40 shadow-sm"
              : homeIsLoser
              ? "border-border bg-muted/30 opacity-40"
              : canPlay
              ? "border-border hover:border-primary hover:bg-primary/5 cursor-pointer"
              : "border-border bg-muted/20 cursor-default"
            }`}
        >
          <span className="text-2xl leading-none shrink-0">
            {homeTeam?.flagEmoji ?? "🏳️"}
          </span>
          <span className={`flex-1 font-semibold text-sm ${homeIsLoser ? "line-through" : ""}`}>
            {homeTeam?.name ?? match.homePlaceholder ?? "TBD"}
          </span>
          {homeIsWinner && (
            <span className="text-xs font-bold text-green-600 shrink-0">🏆 Winner</span>
          )}
          {canPlay && (
            <span className="text-[10px] text-muted-foreground shrink-0 hidden sm:block">
              click to pick
            </span>
          )}
        </button>

        {/* VS divider */}
        <div className="flex items-center gap-2 px-1">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs font-bold text-muted-foreground">VS</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* AWAY TEAM */}
        <button
          onClick={pickAway}
          disabled={!canPlay}
          title={canPlay ? `Pick ${awayTeam?.name ?? "away team"} as winner` : undefined}
          className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 border-2 transition-all text-left
            ${awayIsWinner
              ? "border-green-500 bg-green-50 dark:bg-green-950/40 shadow-sm"
              : awayIsLoser
              ? "border-border bg-muted/30 opacity-40"
              : canPlay
              ? "border-border hover:border-primary hover:bg-primary/5 cursor-pointer"
              : "border-border bg-muted/20 cursor-default"
            }`}
        >
          <span className="text-2xl leading-none shrink-0">
            {awayTeam?.flagEmoji ?? "🏳️"}
          </span>
          <span className={`flex-1 font-semibold text-sm ${awayIsLoser ? "line-through" : ""}`}>
            {awayTeam?.name ?? match.awayPlaceholder ?? "TBD"}
          </span>
          {awayIsWinner && (
            <span className="text-xs font-bold text-green-600 shrink-0">🏆 Winner</span>
          )}
          {canPlay && (
            <span className="text-[10px] text-muted-foreground shrink-0 hidden sm:block">
              click to pick
            </span>
          )}
        </button>
      </div>

      {/* ── Footer ─────────────────────────────── */}
      <div className="flex items-center justify-between px-3 pb-3 gap-2 flex-wrap">
        {canPlay ? (
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-7"
            onClick={() => simulateKnockoutMatch(match.id)}
          >
            ⚡ Auto Pick
          </Button>
        ) : !hasTeams ? (
          <span className="text-xs text-muted-foreground italic">Waiting for teams…</span>
        ) : (
          <span className="text-xs text-muted-foreground">
            Winner: <strong>{homeIsWinner ? homeTeam?.name : awayTeam?.name}</strong>
          </span>
        )}

        {advancesTo && (
          <span className="text-[11px] text-muted-foreground ml-auto">
            Winner → <span className="font-mono font-bold">{advancesTo}</span>
          </span>
        )}
      </div>
    </div>
  );
}
