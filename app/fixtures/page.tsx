"use client";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTournamentStore } from "@/store/tournamentStore";
import type { Stage } from "@/lib/types";
import KnockoutMatchNode from "@/components/KnockoutMatchNode";

const KNOCKOUT_STAGES: { value: Stage | "ALL"; label: string }[] = [
  { value: "ALL",         label: "All Knockout" },
  { value: "R32",         label: "Round of 32" },
  { value: "R16",         label: "Round of 16" },
  { value: "QF",          label: "Quarter-finals" },
  { value: "SF",          label: "Semi-finals" },
  { value: "THIRD_PLACE", label: "3rd Place" },
  { value: "FINAL",       label: "Final" },
];

export default function FixturesPage() {
  const fixtures = useTournamentStore((s) => s.fixtures);
  const [filter, setFilter] = useState<Stage | "ALL">("ALL");

  const knockoutMatches = useMemo(() => {
    return fixtures
      .filter((m) => m.stage !== "GROUP")
      .filter((m) => filter === "ALL" || m.stage === filter);
  }, [fixtures, filter]);

  const completed = knockoutMatches.filter((m) => m.status === "COMPLETED").length;
  const hasBracket = knockoutMatches.some((m) => !!m.homeTeamId || !!m.awayTeamId);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Knockout Matches</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Click a team row to pick them as the match winner. They advance automatically.
        </p>
      </div>

      {/* Stage filter */}
      <div className="flex flex-wrap gap-1.5">
        {KNOCKOUT_STAGES.map((s) => (
          <Button
            key={s.value}
            size="sm"
            variant={filter === s.value ? "default" : "outline"}
            className="text-xs h-7 px-2.5"
            onClick={() => setFilter(s.value)}
          >
            {s.label}
          </Button>
        ))}
      </div>

      <Badge variant="secondary">
        {completed} / {knockoutMatches.length} matches completed
      </Badge>

      {!hasBracket ? (
        <div className="text-center py-16 border rounded-xl text-muted-foreground space-y-2">
          <p className="text-2xl">🔒</p>
          <p className="font-medium">Knockout bracket not generated yet</p>
          <p className="text-sm">Complete group stage → pick 3rd-place teams → confirm to unlock.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {knockoutMatches.map((m) => (
            <KnockoutMatchNode key={m.id} match={m} />
          ))}
        </div>
      )}
    </div>
  );
}
