"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTournamentStore } from "@/store/tournamentStore";
import { teamsMap } from "@/data/teams";
import FlagImage from "./FlagImage";

export default function ThirdPlaceSelector() {
  const bestThird                         = useTournamentStore((s) => s.bestThird);
  const storeSelectedIds                  = useTournamentStore((s) => s.selectedThirdPlaceTeamIds);
  const thirdPlaceConfirmed               = useTournamentStore((s) => s.thirdPlaceConfirmed);
  const setSelectedThirdPlaceTeamIds      = useTournamentStore((s) => s.setSelectedThirdPlaceTeamIds);
  const confirmThirdPlaceAndGenerateKnockout = useTournamentStore((s) => s.confirmThirdPlaceAndGenerateKnockout);

  const initialIds =
    storeSelectedIds.length > 0
      ? storeSelectedIds
      : bestThird.slice(0, 8).map((r) => r.teamId);

  const [selected, setSelected] = useState<Set<string>>(new Set(initialIds));

  function toggle(teamId: string) {
    if (thirdPlaceConfirmed) return;
    const next = new Set(selected);
    if (next.has(teamId)) {
      next.delete(teamId);
    } else {
      if (next.size >= 8) return;
      next.add(teamId);
    }
    setSelected(next);
    setSelectedThirdPlaceTeamIds([...next]);
  }

  function handleConfirm() {
    if (selected.size !== 8) return;
    setSelectedThirdPlaceTeamIds([...selected]);
    confirmThirdPlaceAndGenerateKnockout();
  }

  const count     = selected.size;
  const remaining = 8 - count;

  if (bestThird.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8 border rounded-lg">
        No third-place teams yet — complete group standings first.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-semibold">Choose 8 Teams to Advance</h2>
          <p className="text-sm text-muted-foreground">
            The top 8 are pre-selected. Tap any team to swap them in or out.
          </p>
        </div>
        <Badge
          className={`text-sm px-4 py-1.5 font-bold shrink-0 ${
            count === 8
              ? "bg-green-500 hover:bg-green-500 text-white"
              : "bg-amber-400 hover:bg-amber-400 text-black"
          }`}
        >
          {count} / 8 selected
        </Badge>
      </div>

      {/* Team list */}
      <div className="space-y-2">
        {bestThird.map((row, idx) => {
          const team       = teamsMap[row.teamId];
          const isSelected = selected.has(row.teamId);
          const isBlocked  = !isSelected && count >= 8 && !thirdPlaceConfirmed;
          const isCutoff   = idx === 7;

          return (
            <div key={row.teamId}>
              <button
                onClick={() => toggle(row.teamId)}
                disabled={isBlocked || thirdPlaceConfirmed}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all
                  ${isSelected
                    ? "border-green-500 bg-green-50 dark:bg-green-950/30 shadow-sm"
                    : "border-border bg-card hover:border-muted-foreground/30"
                  }
                  ${isBlocked ? "opacity-35 cursor-not-allowed" : thirdPlaceConfirmed ? "cursor-default" : "cursor-pointer hover:shadow-sm"}
                `}
              >
                <span className="w-7 shrink-0 text-center font-mono text-sm font-bold text-muted-foreground">
                  {idx + 1}
                </span>

                {/* Checkbox */}
                <div className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-colors ${
                  isSelected ? "border-green-500 bg-green-500" : "border-muted-foreground/40"
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {/* Flag + Name */}
                {team && (
                  <FlagImage
                    isoCode={team.isoCode}
                    name={team.name}
                    size="md"
                    fallbackEmoji={team.flagEmoji}
                    className="shrink-0"
                  />
                )}
                <span className="flex-1 font-semibold text-sm">{team?.name}</span>

                <Badge variant="outline" className="text-[11px] px-2 shrink-0">
                  Group {row.group}
                </Badge>

                {!thirdPlaceConfirmed && (
                  <span className={`text-[11px] font-semibold shrink-0 hidden sm:block ${isSelected ? "text-green-600" : "text-muted-foreground"}`}>
                    {isSelected ? "✓ Advances" : "Eliminated"}
                  </span>
                )}
              </button>

              {/* Cut-off line after 8th */}
              {isCutoff && (
                <div className="flex items-center gap-2 my-2 px-1">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-[11px] text-muted-foreground font-medium shrink-0">
                    ─ Cut-off · 4 teams below eliminated ─
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!thirdPlaceConfirmed ? (
        <div className="pt-2 space-y-2">
          <Button size="lg" className="w-full sm:w-auto" disabled={count !== 8} onClick={handleConfirm}>
            {count === 8
              ? "✅ Confirm Selection & Generate Round of 32 →"
              : `Select ${remaining} more team${remaining !== 1 ? "s" : ""} to continue`}
          </Button>
        </div>
      ) : (
        <div className="border border-green-500/40 bg-green-50 dark:bg-green-950/20 rounded-xl p-4 text-sm text-green-700 dark:text-green-400 font-medium">
          ✅ 8 teams confirmed — Round of 32 bracket generated.
          Head to the <strong>Bracket</strong> page to play the knockout stage.
        </div>
      )}
    </div>
  );
}
