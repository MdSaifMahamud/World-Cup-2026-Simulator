"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useTournamentStore } from "@/store/tournamentStore";
import { teamsMap } from "@/data/teams";
import FlagImage from "./FlagImage";

export default function ChampionCard() {
  const champion  = useTournamentStore((s) => s.champion);
  const runnerUp  = useTournamentStore((s) => s.runnerUp);
  const thirdPlace = useTournamentStore((s) => s.thirdPlace);

  if (!champion) return null;

  const champ  = teamsMap[champion];
  const runner = runnerUp  ? teamsMap[runnerUp]   : null;
  const third  = thirdPlace ? teamsMap[thirdPlace] : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
      {runner && (
        <Card className="border-gray-400 text-center">
          <CardContent className="p-4 flex flex-col items-center gap-2">
            <FlagImage isoCode={runner.isoCode} name={runner.name} size="xl" fallbackEmoji={runner.flagEmoji} />
            <div className="text-lg font-semibold">{runner.name}</div>
            <div className="text-xs text-muted-foreground bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1">
              🥈 Runner-Up
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-yellow-400 shadow-lg shadow-yellow-200 dark:shadow-yellow-900/30 text-center order-first sm:order-0">
        <CardContent className="p-6 flex flex-col items-center gap-2">
          <FlagImage isoCode={champ?.isoCode ?? ""} name={champ?.name ?? ""} size="xl" fallbackEmoji={champ?.flagEmoji} />
          <div className="text-2xl font-bold">{champ?.name}</div>
          <div className="text-sm text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 rounded-full px-4 py-1.5 font-semibold">
            🏆 Champion
          </div>
        </CardContent>
      </Card>

      {third && (
        <Card className="border-amber-600 text-center">
          <CardContent className="p-4 flex flex-col items-center gap-2">
            <FlagImage isoCode={third.isoCode} name={third.name} size="xl" fallbackEmoji={third.flagEmoji} />
            <div className="text-lg font-semibold">{third.name}</div>
            <div className="text-xs text-muted-foreground bg-amber-100 dark:bg-amber-900/30 rounded-full px-3 py-1">
              🥉 Third Place
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
