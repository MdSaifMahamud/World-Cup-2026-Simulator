"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GROUP_IDS } from "@/data/groups";
import { useTournamentStore } from "@/store/tournamentStore";
import TournamentSteps from "@/components/TournamentSteps";
import GroupSection from "@/components/GroupSection";
import SimulationControls from "@/components/SimulationControls";
import type { GroupId } from "@/lib/types";

export default function GroupsPage() {
  const manualGroupOrders = useTournamentStore((s) => s.manualGroupOrders);
  const phase = useTournamentStore((s) => s.phase);
  const groupsSet = GROUP_IDS.filter((g) => manualGroupOrders[g] !== null).length;
  const allGroupsDone = phase !== "GROUP_STAGE";

  return (
    <div className="space-y-4">
      <TournamentSteps />

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Group Stage</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Select final standings for each group — 1st through 4th place.
          </p>
        </div>
        <Badge
          variant={allGroupsDone ? "default" : "secondary"}
          className="text-sm px-3 py-1.5 shrink-0"
        >
          {groupsSet} / 12 groups set
        </Badge>
      </div>

      <SimulationControls />

      {/* Proceed banner */}
      {allGroupsDone && (
        <div className="border border-green-500/40 bg-green-50 dark:bg-green-950/20 rounded-lg p-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm font-semibold text-green-700 dark:text-green-400">
              ✅ All 12 group standings confirmed!
            </p>
            <p className="text-xs text-green-600 dark:text-green-500 mt-0.5">
              Now pick which 8 third-place teams advance to the Round of 32.
            </p>
          </div>
          <Link
            href="/third-place"
            className={cn(buttonVariants({ size: "sm" }), "shrink-0 bg-green-600 hover:bg-green-700 text-white")}
          >
            Next: Pick 3rd-Place Teams →
          </Link>
        </div>
      )}

      {/* All groups grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {GROUP_IDS.map((g) => (
          <div
            key={g}
            id={`group-${g}`}
            className="border rounded-xl p-4 space-y-3 bg-card"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold tracking-tight">Group {g}</h2>
              {manualGroupOrders[g] ? (
                <span className="text-[11px] font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                  Done
                </span>
              ) : (
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 inline-block" />
                  Pending
                </span>
              )}
            </div>
            <GroupSection groupId={g as GroupId} />
          </div>
        ))}
      </div>
    </div>
  );
}
