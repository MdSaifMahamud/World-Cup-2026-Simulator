"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTournamentStore } from "@/store/tournamentStore";
import { groupsMap } from "@/data/groups";
import { teamsMap } from "@/data/teams";
import FlagImage from "./FlagImage";
import type { GroupId } from "@/lib/types";

interface PositionMeta {
  rank: number;
  label: string;
  rowClass: string;
  badgeClass: string;
  badgeLabel: string;
}

const POSITIONS: PositionMeta[] = [
  { rank: 1, label: "1st", rowClass: "border-green-500/30 bg-green-50 dark:bg-green-950/30",  badgeClass: "bg-green-500 text-white hover:bg-green-500",  badgeLabel: "Qualified"    },
  { rank: 2, label: "2nd", rowClass: "border-green-500/30 bg-green-50 dark:bg-green-950/30",  badgeClass: "bg-green-500 text-white hover:bg-green-500",  badgeLabel: "Qualified"    },
  { rank: 3, label: "3rd", rowClass: "border-yellow-400/40 bg-yellow-50 dark:bg-yellow-950/30", badgeClass: "bg-yellow-400 text-black hover:bg-yellow-400", badgeLabel: "Possible 3rd" },
  { rank: 4, label: "4th", rowClass: "border-red-400/30 bg-red-50 dark:bg-red-950/20",         badgeClass: "bg-red-400 text-white hover:bg-red-400",       badgeLabel: "Eliminated"   },
];

interface Props { groupId: GroupId }

export default function GroupPositionSelector({ groupId }: Props) {
  const teamIds      = groupsMap[groupId].teamIds;
  const manualOrder  = useTournamentStore((s) => s.manualGroupOrders[groupId]);
  const setGroupOrder = useTournamentStore((s) => s.setGroupOrder);
  const simulateGroup = useTournamentStore((s) => s.simulateGroup);

  const [selections, setSelections] = useState<(string | null)[]>(
    manualOrder ?? [null, null, null, null]
  );

  useEffect(() => {
    setSelections(manualOrder ?? [null, null, null, null]);
  }, [manualOrder]);

  function handleSelect(positionIdx: number, teamId: string) {
    const next = [...selections];

    if (next[positionIdx] === teamId) {
      next[positionIdx] = null;
    } else {
      const prevSlot = next.indexOf(teamId);
      if (prevSlot !== -1) next[prevSlot] = null;
      next[positionIdx] = teamId;
    }

    // Auto-fill 4th when 3 are set
    const filledCount = next.filter((s) => s !== null).length;
    if (filledCount === 3) {
      const usedTeams = next.filter((s) => s !== null) as string[];
      const remaining = teamIds.find((id) => !usedTeams.includes(id));
      const emptySlot = next.findIndex((s) => s === null);
      if (remaining !== undefined && emptySlot !== -1) next[emptySlot] = remaining;
    }

    setSelections(next);

    if (next.every((s) => s !== null)) {
      setGroupOrder(groupId, next as string[]);
    } else if (manualOrder) {
      setGroupOrder(groupId, null);
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
        Click a team to assign their finishing position. The 4th place fills automatically once the top 3 are chosen.
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
              <span className="text-sm font-bold tabular-nums text-muted-foreground w-5">{pos.label}</span>
              <Badge className={`text-[10px] px-1.5 py-0.5 ${pos.badgeClass}`}>{pos.badgeLabel}</Badge>
            </div>

            {/* Team buttons */}
            <div className="flex flex-wrap gap-1.5 flex-1">
              {teamIds.map((teamId) => {
                const team = teamsMap[teamId];
                const isThisSlotSelected = selections[idx] === teamId;
                const isUsedInOtherSlot  = selections.includes(teamId) && !isThisSlotSelected;

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
                        : "border-border bg-background hover:border-primary hover:bg-primary/8 cursor-pointer"
                    }`}
                  >
                    {team && (
                      <FlagImage
                        isoCode={team.isoCode}
                        name={team.name}
                        size="sm"
                        fallbackEmoji={team.flagEmoji}
                      />
                    )}
                    <span>{team?.shortName}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected team display */}
            {selectedTeamId && (() => {
              const t = teamsMap[selectedTeamId];
              return (
                <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold min-w-17.5">
                  {t && <FlagImage isoCode={t.isoCode} name={t.name} size="sm" fallbackEmoji={t.flagEmoji} />}
                  <span>{t?.shortName}</span>
                </div>
              );
            })()}
          </div>
        );
      })}

      {/* Action buttons */}
      <div className="flex items-center gap-2 pt-1 flex-wrap">
        <Button size="sm" variant="secondary" onClick={() => simulateGroup(groupId)}>
          ⚡ Auto Simulate Group {groupId}
        </Button>
        {anySet && (
          <Button size="sm" variant="outline" onClick={handleClear}>Clear</Button>
        )}
      </div>

      {allSet  && <p className="text-xs text-green-600 dark:text-green-400 font-medium pt-1">✅ Group {groupId} standings confirmed</p>}
      {!allSet && anySet && <p className="text-xs text-yellow-600 dark:text-yellow-400 pt-1">Assign all 4 positions to confirm standings</p>}
    </div>
  );
}
