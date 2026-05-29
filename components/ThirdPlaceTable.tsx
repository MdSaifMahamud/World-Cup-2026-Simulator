"use client";
import { Badge } from "@/components/ui/badge";
import { useTournamentStore } from "@/store/tournamentStore";
import { teamsMap } from "@/data/teams";

export default function ThirdPlaceTable() {
  const bestThird = useTournamentStore((s) => s.bestThird);

  if (bestThird.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12 border rounded-lg">
        <p className="text-lg font-medium mb-1">No third-place teams yet</p>
        <p className="text-sm">Complete group stage matches to see rankings here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50 text-muted-foreground text-xs">
            <th className="text-left py-2 px-3 w-8">Rank</th>
            <th className="text-left py-2 px-3">Team</th>
            <th className="py-2 px-2 text-center w-12">Group</th>
            <th className="py-2 px-2 text-center w-8">P</th>
            <th className="py-2 px-2 text-center w-8">Pts</th>
            <th className="py-2 px-2 text-center w-8">GD</th>
            <th className="py-2 px-2 text-center w-8">GF</th>
            <th className="py-2 px-2 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {bestThird.map((row, idx) => {
            const team = teamsMap[row.teamId];
            const qualified = idx < 8;
            return (
              <tr
                key={row.teamId}
                className={`border-t transition-colors ${
                  qualified
                    ? "bg-yellow-500/10 border-l-4 border-yellow-400"
                    : "bg-red-500/10 border-l-4 border-red-400 opacity-60"
                }`}
              >
                <td className="py-2 px-3 font-mono text-xs font-bold">{idx + 1}</td>
                <td className="py-2 px-3 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="text-base">{team?.flagEmoji}</span>
                    <span className="hidden sm:inline">{team?.name}</span>
                    <span className="sm:hidden">{team?.shortName}</span>
                  </span>
                </td>
                <td className="py-2 px-2 text-center">
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    {row.group}
                  </Badge>
                </td>
                <td className="py-2 px-2 text-center text-muted-foreground">{row.played}</td>
                <td className="py-2 px-2 text-center font-bold">{row.points}</td>
                <td className="py-2 px-2 text-center">
                  <span className={row.goalDifference > 0 ? "text-green-600" : row.goalDifference < 0 ? "text-red-500" : ""}>
                    {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                  </span>
                </td>
                <td className="py-2 px-2 text-center">{row.goalsFor}</td>
                <td className="py-2 px-2 text-center">
                  {qualified ? (
                    <Badge className="text-[10px] bg-yellow-500 hover:bg-yellow-500 text-black">Advances</Badge>
                  ) : (
                    <Badge variant="destructive" className="text-[10px]">Eliminated</Badge>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
