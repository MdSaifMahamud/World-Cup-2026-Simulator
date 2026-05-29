"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTournamentStore } from "@/store/tournamentStore";
import ChampionCard from "@/components/ChampionCard";
import SimulationControls from "@/components/SimulationControls";
import TournamentSteps from "@/components/TournamentSteps";
import { GROUP_IDS } from "@/data/groups";

const FEATURES = [
  { icon: "🖱️", title: "Click to Place Teams",   desc: "Select 1st–4th for each group — no scores needed." },
  { icon: "⚡", title: "Auto Simulation",          desc: "Simulate one group, all groups, or the full tournament." },
  { icon: "🥉", title: "Pick 8 Third-Place Teams", desc: "Choose which 8 of 12 third-placed teams advance." },
  { icon: "🏆", title: "Knockout Bracket",         desc: "Click a team to pick the winner through to the Final." },
  { icon: "📊", title: "Live Standings",            desc: "Group tables update instantly as you set positions." },
  { icon: "💾", title: "Save & Export",             desc: "Save to browser, download JSON, or import a saved run." },
];

const NEXT_STEP: Record<string, { label: string; href: string; desc: string }> = {
  GROUP_STAGE:      { label: "Go to Groups",              href: "/groups",       desc: "Set the final standings for all 12 groups." },
  THIRD_PLACE_PICK: { label: "Pick 3rd-Place Teams",      href: "/third-place",  desc: "All groups done! Now choose which 8 third-place teams advance." },
  KNOCKOUT:         { label: "Play the Knockout Bracket",  href: "/bracket",      desc: "Click team cards to pick winners through to the Final." },
};

export default function HomePage() {
  const phase = useTournamentStore((s) => s.phase);
  const manualGroupOrders = useTournamentStore((s) => s.manualGroupOrders);
  const fixtures = useTournamentStore((s) => s.fixtures);
  const champion = useTournamentStore((s) => s.champion);

  const groupsSet = GROUP_IDS.filter((g) => manualGroupOrders[g] !== null).length;
  const knockoutDone = fixtures.filter(
    (m) => m.stage !== "GROUP" && m.status === "COMPLETED"
  ).length;

  // Progress: 12 groups + 1 third-place pick step + 32 knockout = 45 units
  const progress =
    phase === "GROUP_STAGE"
      ? (groupsSet / 12) * 40
      : phase === "THIRD_PLACE_PICK"
      ? 40
      : 40 + 5 + (knockoutDone / 32) * 55;
  const progressPct = Math.min(100, Math.round(progress));

  const nextStep = NEXT_STEP[phase];

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="text-center space-y-4 py-8">
        <div className="text-6xl">⚽</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
          World Football 2026 Simulator
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
          Official 48-team draw · 104 matches · Group Stage → Pick 3rd-Place Teams → Knockout → Champion
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href={nextStep.href} className={cn(buttonVariants({ size: "lg" }))}>
            {nextStep.label}
          </Link>
          <Link href="/groups" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
            View Groups
          </Link>
          <Link href="/bracket" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
            View Bracket
          </Link>
        </div>
      </section>

      {champion && (
        <section>
          <h2 className="text-xl font-semibold mb-3 text-center">🏆 Tournament Results</h2>
          <ChampionCard />
        </section>
      )}

      {/* Step indicator */}
      <TournamentSteps />

      {/* Next step callout */}
      {!champion && (
        <div className="border-2 border-primary/30 bg-primary/5 rounded-xl p-4 sm:p-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">Next step</p>
            <p className="font-semibold text-base">{nextStep.desc}</p>
          </div>
          <Link href={nextStep.href} className={cn(buttonVariants({}), "shrink-0")}>
            {nextStep.label} →
          </Link>
        </div>
      )}

      {/* Progress */}
      <section className="border rounded-lg p-4 sm:p-6 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-lg font-semibold">Tournament Progress</h2>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>Groups: <strong className="text-foreground">{groupsSet}/12</strong></span>
            <span>Knockout: <strong className="text-foreground">{knockoutDone}/32</strong></span>
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">{progressPct}% complete</p>
        <SimulationControls />
      </section>

      {/* Features */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <Card key={f.title} className="hover:shadow-sm transition-shadow">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <span className="text-xl">{f.icon}</span>
                  {f.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
