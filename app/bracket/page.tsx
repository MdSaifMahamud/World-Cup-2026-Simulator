"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTournamentStore } from "@/store/tournamentStore";
import TournamentSteps from "@/components/TournamentSteps";
import KnockoutBracket from "@/components/KnockoutBracket";
import ChampionCard from "@/components/ChampionCard";

export default function BracketPage() {
  const phase = useTournamentStore((s) => s.phase);
  const hasMappingWarning = useTournamentStore((s) => s.hasMappingWarning);
  const champion = useTournamentStore((s) => s.champion);
  const selectedThirdPlaceTeamIds = useTournamentStore((s) => s.selectedThirdPlaceTeamIds);

  return (
    <div className="space-y-5">
      <TournamentSteps />

      <div>
        <h1 className="text-2xl font-bold">Knockout Bracket</h1>
        <p className="text-muted-foreground text-sm mt-1">
          R32 → R16 → QF → SF → Final · Click a team card to pick the winner.
        </p>
      </div>

      {champion && <ChampionCard />}

      {/* Phase gates */}
      {phase === "GROUP_STAGE" && (
        <div className="border border-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-5 text-center space-y-3">
          <p className="text-2xl">🗂️</p>
          <p className="font-semibold text-amber-800 dark:text-amber-300">
            Complete the Group Stage first
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-400">
            Set the final standings for all 12 groups before the knockout bracket is generated.
          </p>
          <Link href="/groups" className={cn(buttonVariants({ size: "sm" }))}>
            Go to Groups →
          </Link>
        </div>
      )}

      {phase === "THIRD_PLACE_PICK" && (
        <div className="border border-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5 text-center space-y-3">
          <p className="text-2xl">🥉</p>
          <p className="font-semibold text-blue-800 dark:text-blue-300">
            Pick your 8 Third-Place Teams
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            All groups are set. Now select which 8 of the 12 third-placed teams advance to the Round of 32.
          </p>
          <Link href="/third-place" className={cn(buttonVariants({ size: "sm" }))}>
            Pick 3rd-Place Teams →
          </Link>
        </div>
      )}

      {phase === "KNOCKOUT" && hasMappingWarning && (
        <div className="border border-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-sm text-blue-800 dark:text-blue-300">
          <strong>Note:</strong> Third-place bracket slots use fallback positional logic.
          Add the official 495-combination mapping in{" "}
          <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">data/thirdPlaceMapping.ts</code>{" "}
          for exact accuracy.
        </div>
      )}

      {phase === "KNOCKOUT" && <KnockoutBracket />}
    </div>
  );
}
