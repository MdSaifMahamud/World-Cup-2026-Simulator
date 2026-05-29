"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTournamentStore } from "@/store/tournamentStore";
import { GROUP_IDS } from "@/data/groups";
import TournamentSteps from "@/components/TournamentSteps";
import ThirdPlaceTable from "@/components/ThirdPlaceTable";
import ThirdPlaceSelector from "@/components/ThirdPlaceSelector";

export default function ThirdPlacePage() {
  const phase = useTournamentStore((s) => s.phase);
  const manualGroupOrders = useTournamentStore((s) => s.manualGroupOrders);
  const groupsSet = GROUP_IDS.filter((g) => manualGroupOrders[g] !== null).length;

  const allGroupsDone = phase !== "GROUP_STAGE";

  return (
    <div className="space-y-6">
      <TournamentSteps />

      <div>
        <h1 className="text-2xl font-bold">Third-Place Teams</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {allGroupsDone
            ? "All groups complete. Pick exactly 8 teams to advance to the Round of 32."
            : `Complete all group standings first (${groupsSet}/12 done).`}
        </p>
      </div>

      {/* Group stage not done */}
      {!allGroupsDone && (
        <>
          <div className="border border-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 text-sm text-amber-800 dark:text-amber-300">
            <strong>{groupsSet}/12 groups set.</strong> Complete all group standings to unlock
            third-place selection.
          </div>
          <ThirdPlaceTable />
          <Link href="/groups" className={cn(buttonVariants({ variant: "outline" }))}>
            ← Back to Groups
          </Link>
        </>
      )}

      {/* All groups done — show selection UI */}
      {allGroupsDone && (
        <>
          {/* Rankings reference */}
          <details className="border rounded-lg overflow-hidden">
            <summary className="cursor-pointer px-4 py-3 bg-muted/40 text-sm font-medium select-none">
              📊 Auto-ranked table (click to expand)
            </summary>
            <div className="p-4">
              <ThirdPlaceTable />
              <p className="text-xs text-muted-foreground mt-2">
                Ranked by team rating (no match stats in this simulator). Use the selection below to override.
              </p>
            </div>
          </details>

          {/* Interactive selector */}
          <ThirdPlaceSelector />
        </>
      )}
    </div>
  );
}
