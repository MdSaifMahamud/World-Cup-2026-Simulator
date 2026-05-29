"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useTournamentStore } from "@/store/tournamentStore";
import { teamsMap } from "@/data/teams";

export default function ChampionCard() {
  const champion = useTournamentStore((s) => s.champion);
  const runnerUp = useTournamentStore((s) => s.runnerUp);
  const thirdPlace = useTournamentStore((s) => s.thirdPlace);

  if (!champion) return null;

  const champ = teamsMap[champion];
  const runner = runnerUp ? teamsMap[runnerUp] : null;
  const third = thirdPlace ? teamsMap[thirdPlace] : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
      {runner && (
        <Card className="border-gray-400 text-center">
          <CardContent className="p-4">
            <div className="text-4xl mb-1">{runner.flagEmoji}</div>
            <div className="text-lg font-semibold">{runner.name}</div>
            <div className="text-xs text-muted-foreground mt-1 bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 inline-block">
              🥈 Runner-Up
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-yellow-400 shadow-lg shadow-yellow-200 dark:shadow-yellow-900/30 text-center order-first sm:order-none">
        <CardContent className="p-6">
          <div className="text-6xl mb-2">{champ?.flagEmoji}</div>
          <div className="text-2xl font-bold">{champ?.name}</div>
          <div className="text-sm text-yellow-600 mt-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full px-4 py-1.5 inline-block font-semibold">
            🏆 Champion
          </div>
        </CardContent>
      </Card>

      {third && (
        <Card className="border-amber-600 text-center">
          <CardContent className="p-4">
            <div className="text-4xl mb-1">{third.flagEmoji}</div>
            <div className="text-lg font-semibold">{third.name}</div>
            <div className="text-xs text-muted-foreground mt-1 bg-amber-100 dark:bg-amber-900/30 rounded-full px-3 py-1 inline-block">
              🥉 Third Place
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
