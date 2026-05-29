"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTournamentStore } from "@/store/tournamentStore";
import { groupsMap } from "@/data/groups";
import { teamsMap } from "@/data/teams";
import type { GroupId } from "@/lib/types";

interface PositionMeta {
  rank: number;
  label: string;
  rowClass: string;
  badgeClass: string;
  badgeLabel: string;
}

const POSITIONS: PositionMeta[] = [
  {
    rank: 1,
    label: "1st",
    rowClass: "border-green-500/30 bg-green-50 dark:bg-green-950/30",
    badgeClass: "bg-green-500 text-white hover:bg-green-500",
    badgeLabel: "Qualified",
  },
  {
    rank: 2,
    label: "2nd",
    rowClass: "border-green-500/30 bg-green-50 dark:bg-green-950/30",
    badgeClass: "bg-green-500 text-white hover:bg-green-500",
    badgeLabel: "Qualified",
  },
  {
    rank: 3,
    label: "3rd",
    rowClass: "border-yellow-400/40 bg-yellow-50 dark:bg-yellow-950/30",
    badgeClass: "bg-yellow-400 text-black hover:bg-yellow-400",
    badgeLabel: "Possible 3rd",
  },
  {
    rank: 4,
    label: "4th",
    rowClass: "border-red-400/30 bg-red-50 dark:bg-red-950/20",
    badgeClass: "bg-red-400 text-white hover:bg-red-400",
    badgeLabel: "Eliminated",
  },
];

interface Props {
  groupId: GroupId;
}

export default function GroupPositionSelector({ groupId }: Props) {
  const teamIds = groupsMap[groupId].teamIds;
  const manualOrder = useTournamentStore((s) => s.manualGroupOrders[groupId]);
  const setGroupOrder = useTournamentStore((s) => s.setGroupOrder);
  const simulateGroup = useTournamentStore((s) => s.simulateGroup);

  // Local selection: index = rank-1, value = teamId | null
  const [selections, setSelections] = useState<(string | null)[]>(
    manualOrder ?? [null, null, null, null]
  );

  // Sync when store changes (e.g. after auto-simulate or reset)
  useEffect(() => {
    setSelections(manualOrder ?? [null, null, null, null]);
  }, [manualOrder]);

  function handleSelect(positionIdx: number, teamId: string) {
    const next = [...selections];

    // If clicking the team already in this slot → deselect it
    if (next[positionIdx] === teamId) {
      next[positionIdx] = null;
    } else {
      // If this team was previously in another slot → clear that slot (swap)
      const prevSlot = next.indexOf(teamId);
      if (prevSlot !== -1) next[prevSlot] = null;
      next[positionIdx] = teamId;
    }

    // Auto-fill: when exactly 3 slots are filled, place the remaining
    // team automatically in the one empty slot
    const filledCount = next.filter((s) => s !== null).length;
    if (filledCount === 3) {
      const usedTeams = next.filter((s) => s !== null) as string[];
      const remainingTeam = teamIds.find((id) => !usedTeams.includes(id));
      const emptySlot = next.findIndex((s) => s === null);
      if (remainingTeam !== undefined && emptySlot !== -1) {
        next[emptySlot] = remainingTeam;
      }
    }

    setSelections(next);

    // Commit to store when all 4 are assigned
    if (next.every((s) => s !== null)) {
      setGroupOrder(groupId, next as string[]);
    } else {
      // Had a full order before but now it's incomplete → clear store
      if (manualOrder) setGroupOrder(groupId, null);
    }
  }

  function handleClear() {
    setSelections([null, null, null, null]);
    setGroupOrder(groupId, null);
  }

  const allSet = selections.every((s) => s !== null);
  const anySet = selections.some((s) => s !== null);

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground mb-3">
        Click a team to assign their finishing position. The 4th place team fills automatically once the top 3 are chosen.
      </p>

      {POSITIONS.map((pos, idx) => {
        const selectedTeamId = selections[idx];
        return (
          <div
            key={pos.rank}
            className={`flex items-center gap-3 p-3 rounded-lg border ${pos.rowClass} transition-all`}
          >
            {/* Position label */}
            <div className="flex items-center gap-2 w-32 shrink-0">
              <span className="text-sm font-bold tabular-nums text-muted-foreground w-5">
                {pos.label}
              </span>
              <Badge className={`text-[10px] px-1.5 py-0.5 ${pos.badgeClass}`}>
                {pos.badgeLabel}
              </Badge>
            </div>

            {/* Team buttons */}
            <div className="flex flex-wrap gap-1.5 flex-1">
              {teamIds.map((teamId) => {
                const team = teamsMap[teamId];
                const isThisSlotSelected = selections[idx] === teamId;
                const isUsedInOtherSlot =
                  selections.includes(teamId) && !isThisSlotSelected;

                return (
                  <button
                    key={teamId}
                    onClick={() => handleSelect(idx, teamId)}
                    disabled={isUsedInOtherSlot}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs border transition-all font-medium ${
                      isThisSlotSelected
                        ? "bg-primary text-primary-foreground border-primary shadow-sm scale-105"
                        : isUsedInOtherSlot
                        ? "opacity-25 cursor-not-allowed border-border bg-background"
                        : "border-border bg-background hover:border-primary hover:bg-primary/8 cursor-pointer hover:scale-102"
                    }`}
                  >
                    <span className="text-base leading-none">{team?.flagEmoji}</span>
                    <span>{team?.shortName}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected team display */}
            {selectedTeamId && (
              <div className="shrink-0 text-xs font-semibold text-right min-w-[60px]">
                <span className="text-base">{teamsMap[selectedTeamId]?.flagEmoji}</span>
                <span className="ml-1">{teamsMap[selectedTeamId]?.shortName}</span>
              </div>
            )}
          </div>
        );
      })}

      {/* Action buttons */}
      <div className="flex items-center gap-2 pt-1 flex-wrap">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => simulateGroup(groupId)}
        >
          ⚡ Auto Simulate Group {groupId}
        </Button>
        {anySet && (
          <Button size="sm" variant="outline" onClick={handleClear}>
            Clear
          </Button>
        )}
      </div>

      {/* Status feedback */}
      {allSet && (
        <p className="text-xs text-green-600 dark:text-green-400 font-medium pt-1">
          ✅ Group {groupId} standings confirmed
        </p>
      )}
      {!allSet && anySet && (
        <p className="text-xs text-yellow-600 dark:text-yellow-400 pt-1">
          Assign all 4 positions to confirm standings
        </p>
      )}
    </div>
  );
}
