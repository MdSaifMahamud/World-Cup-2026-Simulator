"use client";
import Link from "next/link";
import { useTournamentStore, type TournamentPhase } from "@/store/tournamentStore";
import { GROUP_IDS } from "@/data/groups";

const STEPS = [
  { phase: "GROUP_STAGE" as TournamentPhase,     label: "Group Stage",       href: "/groups",      num: 1 },
  { phase: "THIRD_PLACE_PICK" as TournamentPhase, label: "Pick 3rd-Place 8", href: "/third-place", num: 2 },
  { phase: "KNOCKOUT" as TournamentPhase,         label: "Knockout Bracket",  href: "/bracket",     num: 3 },
];

const PHASE_ORDER: TournamentPhase[] = ["GROUP_STAGE","THIRD_PLACE_PICK","KNOCKOUT"];

export default function TournamentSteps() {
  const phase = useTournamentStore((s) => s.phase);
  const manualGroupOrders = useTournamentStore((s) => s.manualGroupOrders);
  const groupsSet = GROUP_IDS.filter((g) => manualGroupOrders[g] !== null).length;
  const champion = useTournamentStore((s) => s.champion);
  const currentIdx = PHASE_ORDER.indexOf(phase);

  return (
    <div className="flex items-center gap-0 text-sm flex-wrap justify-center mb-6">
      {STEPS.map((step, idx) => {
        const isDone = idx < currentIdx || (idx === 2 && !!champion);
        const isCurrent = idx === currentIdx && !champion;
        const isAccessible = idx <= currentIdx;

        return (
          <div key={step.num} className="flex items-center">
            <Link
              href={isAccessible ? step.href : "#"}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                isCurrent
                  ? "bg-primary text-primary-foreground font-semibold"
                  : isDone
                  ? "text-green-600 dark:text-green-400 font-medium hover:bg-muted"
                  : "text-muted-foreground cursor-not-allowed"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                  isDone
                    ? "bg-green-500 text-white"
                    : isCurrent
                    ? "bg-primary-foreground text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isDone ? "✓" : step.num}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
              {step.num === 1 && isCurrent && (
                <span className="text-[10px] opacity-80">({groupsSet}/12)</span>
              )}
            </Link>

            {idx < STEPS.length - 1 && (
              <span className="mx-1 text-muted-foreground">›</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
