"use client";
import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [active, setActive] = useState<GroupId>("A");
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

      <Tabs value={active} onValueChange={(v) => setActive(v as GroupId)}>
        <TabsList className="flex-wrap h-auto gap-1 p-1">
          {GROUP_IDS.map((g) => (
            <TabsTrigger key={g} value={g} className="text-xs px-2.5 py-1.5 relative">
              {g}
              {manualGroupOrders[g] && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {GROUP_IDS.map((g) => (
          <TabsContent key={g} value={g} className="mt-4">
            <GroupSection groupId={g} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
