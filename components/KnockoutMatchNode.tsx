"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Match } from "@/lib/types";
import { teamsMap } from "@/data/teams";
import { useTournamentStore } from "@/store/tournamentStore";
import FlagImage from "./FlagImage";

const ADVANCES_TO: Record<string, string> = {
  M73:"M90", M74:"M89", M75:"M90", M76:"M91",
  M77:"M89", M78:"M91", M79:"M92", M80:"M92",
  M81:"M94", M82:"M94", M83:"M93", M84:"M93",
  M85:"M96", M86:"M95", M87:"M96", M88:"M95",
  M89:"M97", M90:"M97", M91:"M99", M92:"M99",
  M93:"M98", M94:"M98", M95:"M100",M96:"M100",
  M97:"M101",M98:"M101",M99:"M102",M100:"M102",
  M101:"M104",M102:"M104",
};

const STAGE_LABELS: Record<string, string> = {
  R32:"Round of 32", R16:"Round of 16",
  QF:"Quarter-Final", SF:"Semi-Final",
  THIRD_PLACE:"3rd Place", FINAL:"Final ⭐",
};

const STAGE_ACCENT: Record<string, string> = {
  R32:"border-l-slate-400", R16:"border-l-blue-400",
  QF:"border-l-purple-400", SF:"border-l-orange-400",
  THIRD_PLACE:"border-l-amber-500", FINAL:"border-l-yellow-400",
};

interface Props { match: Match }

export default function KnockoutMatchNode({ match }: Props) {
  const setKnockoutWinner     = useTournamentStore((s) => s.setKnockoutWinner);
  const simulateKnockoutMatch = useTournamentStore((s) => s.simulateKnockoutMatch);
  const resetKnockoutMatch    = useTournamentStore((s) => s.resetKnockoutMatch);

  const [editOpen, setEditOpen] = useState(false);

  const isCompleted = match.status === "COMPLETED";
  const hasTeams    = !!match.homeTeamId && !!match.awayTeamId;
  const canPlay     = !isCompleted && hasTeams;

  const homeTeam = match.homeTeamId ? teamsMap[match.homeTeamId] : null;
  const awayTeam = match.awayTeamId ? teamsMap[match.awayTeamId] : null;

  const homeIsWinner = isCompleted && match.winnerTeamId === match.homeTeamId;
  const awayIsWinner = isCompleted && match.winnerTeamId === match.awayTeamId;
  const homeIsLoser  = isCompleted && !homeIsWinner && match.winnerTeamId != null;
  const awayIsLoser  = isCompleted && !awayIsWinner && match.winnerTeamId != null;

  const advancesTo = ADVANCES_TO[match.id];
  const accent     = STAGE_ACCENT[match.stage] ?? "border-l-border";

  return (
    <>
      <div className={`rounded-xl border-2 border-l-4 bg-card shadow-sm overflow-hidden ${accent} ${isCompleted ? "border-border/50" : "border-border"}`}>

        {/* ── Header ─────────────────────────────────── */}
        <div className="flex items-center justify-between px-3 py-2 bg-muted/40 border-b gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-mono font-bold text-muted-foreground shrink-0">#{match.matchNumber}</span>
            <Badge variant="secondary" className="text-[10px] py-0 px-1.5 shrink-0">
              {STAGE_LABELS[match.stage]}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {isCompleted && (
              <Badge variant="outline" className="text-[10px] py-0 px-1.5 text-green-600 border-green-500">
                Done ✓
              </Badge>
            )}
            {isCompleted && (
              <button
                onClick={() => setEditOpen(true)}
                title="Edit result"
                className="text-[11px] text-muted-foreground hover:text-foreground border border-border rounded px-1.5 py-0.5 hover:bg-muted transition-colors"
              >
                ✏️ Edit
              </button>
            )}
          </div>
        </div>

        {/* ── Venue ──────────────────────────────────── */}
        {match.venue && (
          <p className="px-3 pt-1.5 text-[11px] text-muted-foreground truncate">📍 {match.venue}</p>
        )}

        {/* ── Team rows ──────────────────────────────── */}
        <div className="p-3 space-y-2">

          {/* HOME TEAM */}
          <button
            onClick={() => canPlay && match.homeTeamId && setKnockoutWinner(match.id, match.homeTeamId)}
            disabled={!canPlay}
            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 border-2 transition-all text-left
              ${homeIsWinner ? "border-green-500 bg-green-50 dark:bg-green-950/40 shadow-sm"
              : homeIsLoser  ? "border-border bg-muted/30 opacity-40"
              : canPlay      ? "border-border hover:border-primary hover:bg-primary/5 cursor-pointer"
              :                "border-border bg-muted/20 cursor-default"}`}
          >
            {homeTeam ? (
              <FlagImage isoCode={homeTeam.isoCode} name={homeTeam.name} size="lg" fallbackEmoji={homeTeam.flagEmoji} className="shrink-0" />
            ) : (
              <span className="text-2xl shrink-0">🏳️</span>
            )}
            <span className={`flex-1 font-semibold text-sm ${homeIsLoser ? "line-through" : ""}`}>
              {homeTeam?.name ?? match.homePlaceholder ?? "TBD"}
            </span>
            {homeIsWinner && <span className="text-xs font-bold text-green-600 shrink-0">🏆 Winner</span>}
            {canPlay && <span className="text-[10px] text-muted-foreground shrink-0 hidden sm:block">tap to pick</span>}
          </button>

          {/* VS */}
          <div className="flex items-center gap-2 px-1">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs font-bold text-muted-foreground">VS</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* AWAY TEAM */}
          <button
            onClick={() => canPlay && match.awayTeamId && setKnockoutWinner(match.id, match.awayTeamId)}
            disabled={!canPlay}
            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 border-2 transition-all text-left
              ${awayIsWinner ? "border-green-500 bg-green-50 dark:bg-green-950/40 shadow-sm"
              : awayIsLoser  ? "border-border bg-muted/30 opacity-40"
              : canPlay      ? "border-border hover:border-primary hover:bg-primary/5 cursor-pointer"
              :                "border-border bg-muted/20 cursor-default"}`}
          >
            {awayTeam ? (
              <FlagImage isoCode={awayTeam.isoCode} name={awayTeam.name} size="lg" fallbackEmoji={awayTeam.flagEmoji} className="shrink-0" />
            ) : (
              <span className="text-2xl shrink-0">🏳️</span>
            )}
            <span className={`flex-1 font-semibold text-sm ${awayIsLoser ? "line-through" : ""}`}>
              {awayTeam?.name ?? match.awayPlaceholder ?? "TBD"}
            </span>
            {awayIsWinner && <span className="text-xs font-bold text-green-600 shrink-0">🏆 Winner</span>}
            {canPlay && <span className="text-[10px] text-muted-foreground shrink-0 hidden sm:block">tap to pick</span>}
          </button>
        </div>

        {/* ── Footer ─────────────────────────────────── */}
        <div className="flex items-center justify-between px-3 pb-3 gap-2 flex-wrap">
          {canPlay ? (
            <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => simulateKnockoutMatch(match.id)}>
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

      {/* Edit confirmation */}
      <AlertDialog open={editOpen} onOpenChange={setEditOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit match result?</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="block space-y-2">
                <span className="block font-medium">
                  #{match.matchNumber} · {homeTeam?.name ?? "Home"} vs {awayTeam?.name ?? "Away"}
                </span>
                <span className="block text-sm">
                  Clearing this result will also reset all downstream matches that depended on it.
                </span>
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { resetKnockoutMatch(match.id); setEditOpen(false); }}>
              Clear &amp; Re-pick
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
