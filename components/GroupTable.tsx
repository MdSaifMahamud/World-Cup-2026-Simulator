"use client";
import { Badge } from "@/components/ui/badge";
import type { GroupId, StandingRow } from "@/lib/types";
import { teamsMap } from "@/data/teams";
import { useTournamentStore } from "@/store/tournamentStore";
import FlagImage from "./FlagImage";

interface Props { groupId: GroupId }

const STATUS_COLORS: Record<string, string> = {
  QUALIFIED:  "bg-green-500/20 border-l-4 border-green-500",
  POSSIBLE:   "bg-yellow-500/10 border-l-4 border-yellow-400",
  ELIMINATED: "bg-red-500/10 border-l-4 border-red-400",
};

export default function GroupTable({ groupId }: Props) {
  const standings = useTournamentStore((s) => s.standings[groupId] ?? []);

  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50 text-muted-foreground text-xs">
            <th className="text-left py-2 px-3 w-6">#</th>
            <th className="text-left py-2 px-3">Team</th>
            <th className="py-2 px-2 text-center w-8">P</th>
            <th className="py-2 px-2 text-center w-8">W</th>
            <th className="py-2 px-2 text-center w-8">D</th>
            <th className="py-2 px-2 text-center w-8">L</th>
            <th className="py-2 px-2 text-center w-8">GF</th>
            <th className="py-2 px-2 text-center w-8">GA</th>
            <th className="py-2 px-2 text-center w-8">GD</th>
            <th className="py-2 px-2 text-center w-8 font-bold text-foreground">Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((row) => {
            const team = teamsMap[row.teamId];
            return (
              <tr
                key={row.teamId}
                className={`border-t transition-colors ${STATUS_COLORS[row.status ?? "ELIMINATED"] ?? ""}`}
              >
                <td className="py-2 px-3 text-muted-foreground text-xs">{row.rank}</td>
                <td className="py-2 px-3 font-medium">
                  <span className="flex items-center gap-2">
                    {team && (
                      <FlagImage
                        isoCode={team.isoCode}
                        name={team.name}
                        size="sm"
                        fallbackEmoji={team.flagEmoji}
                      />
                    )}
                    <span className="hidden sm:inline">{team?.name}</span>
                    <span className="sm:hidden">{team?.shortName}</span>
                  </span>
                </td>
                <td className="py-2 px-2 text-center text-muted-foreground">{row.played}</td>
                <td className="py-2 px-2 text-center">{row.won}</td>
                <td className="py-2 px-2 text-center">{row.drawn}</td>
                <td className="py-2 px-2 text-center">{row.lost}</td>
                <td className="py-2 px-2 text-center">{row.goalsFor}</td>
                <td className="py-2 px-2 text-center">{row.goalsAgainst}</td>
                <td className="py-2 px-2 text-center">
                  <span className={row.goalDifference > 0 ? "text-green-600" : row.goalDifference < 0 ? "text-red-500" : ""}>
                    {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                  </span>
                </td>
                <td className="py-2 px-2 text-center font-bold">{row.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex gap-3 text-[10px] text-muted-foreground p-2 border-t flex-wrap">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Qualified</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" /> Possible 3rd</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> Eliminated</span>
      </div>
    </div>
  );
}
