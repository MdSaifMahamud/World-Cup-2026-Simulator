"use client";
import { useTournamentStore } from "@/store/tournamentStore";
import KnockoutMatchNode from "./KnockoutMatchNode";
import type { Stage } from "@/lib/types";

const LATER_STAGES: Stage[] = ["R16","QF","SF","FINAL"];
const STAGE_LABELS: Record<string, string> = {
  R16: "Round of 16",
  QF:  "Quarter-Finals",
  SF:  "Semi-Finals",
  FINAL: "Final",
};

export default function KnockoutBracket() {
  const fixtures = useTournamentStore((s) => s.fixtures);

  const r32   = fixtures.filter((m) => m.stage === "R32");
  const third = fixtures.find((m) => m.stage === "THIRD_PLACE");
  const later = (stage: Stage) => fixtures.filter((m) => m.stage === stage);

  return (
    <div className="space-y-10">

      {/* ══ ROUND OF 32 ══════════════════════════════════════════ */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-bold">Round of 32</h2>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {r32.filter((m) => m.status === "COMPLETED").length}/{r32.length} played
          </span>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Click a team row to pick the winner — they advance automatically to the Round of 16.
        </p>
        {r32.length === 0 ? (
          <div className="border rounded-xl p-8 text-center text-muted-foreground space-y-2">
            <p className="text-2xl">🔒</p>
            <p className="font-medium">Bracket not generated yet</p>
            <p className="text-sm">Select 8 third-place teams and confirm to unlock the Round of 32.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {r32.map((m) => <KnockoutMatchNode key={m.id} match={m} />)}
          </div>
        )}
      </section>

      {/* ══ LATER ROUNDS ════════════════════════════════════════ */}
      {LATER_STAGES.map((stage) => {
        const matches = later(stage);
        if (matches.length === 0) return null;
        const done = matches.filter((m) => m.status === "COMPLETED").length;
        return (
          <section key={stage}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-bold">{STAGE_LABELS[stage]}</h2>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {done}/{matches.length} played
              </span>
            </div>
            <div className={`grid gap-3 ${
              matches.length === 1 ? "max-w-sm" :
              matches.length === 2 ? "grid-cols-1 sm:grid-cols-2 max-w-2xl" :
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            }`}>
              {matches.map((m) => <KnockoutMatchNode key={m.id} match={m} />)}
            </div>
          </section>
        );
      })}

      {/* ══ THIRD-PLACE MATCH ══════════════════════════════════ */}
      {third && (
        <section>
          <h2 className="text-lg font-bold mb-4">Third-Place Match 🥉</h2>
          <div className="max-w-sm">
            <KnockoutMatchNode match={third} />
          </div>
        </section>
      )}
    </div>
  );
}
