"use client";
import type { GroupId } from "@/lib/types";
import { useTournamentStore } from "@/store/tournamentStore";
import GroupPositionSelector from "./GroupPositionSelector";
import GroupTable from "./GroupTable";

interface Props {
  groupId: GroupId;
}

export default function GroupSection({ groupId }: Props) {
  const manualOrder = useTournamentStore((s) => s.manualGroupOrders[groupId]);

  return (
    <div className="space-y-5">
      <GroupPositionSelector groupId={groupId} />
      {manualOrder && (
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Group {groupId} Standings
          </h4>
          <GroupTable groupId={groupId} />
        </div>
      )}
    </div>
  );
}
