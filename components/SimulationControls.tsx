"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTournamentStore } from "@/store/tournamentStore";
import { GROUP_IDS } from "@/data/groups";

export default function SimulationControls() {
  const simulateAllGroups = useTournamentStore((s) => s.simulateAllGroups);
  const simulateFullTournament = useTournamentStore((s) => s.simulateFullTournament);
  const resetTournament = useTournamentStore((s) => s.resetTournament);
  const saveToLocalStorage = useTournamentStore((s) => s.saveToLocalStorage);
  const loadFromLocalStorage = useTournamentStore((s) => s.loadFromLocalStorage);
  const manualGroupOrders = useTournamentStore((s) => s.manualGroupOrders);

  const allGroupsDone = GROUP_IDS.every((g) => manualGroupOrders[g] !== null);
  const [resetOpen, setResetOpen] = useState(false);
  const [fullSimOpen, setFullSimOpen] = useState(false);

  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="secondary" disabled={allGroupsDone} onClick={simulateAllGroups}>
        ⚡ Simulate All Groups
      </Button>
      <Button size="sm" variant="default" onClick={() => setFullSimOpen(true)}>
        🏆 Full Auto Simulate
      </Button>
      <Button size="sm" variant="outline" onClick={saveToLocalStorage}>
        Save Progress
      </Button>
      <Button size="sm" variant="outline" onClick={loadFromLocalStorage}>
        Load Saved
      </Button>
      <Button size="sm" variant="destructive" onClick={() => setResetOpen(true)}>
        Reset
      </Button>

      <AlertDialog open={resetOpen} onOpenChange={setResetOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Tournament?</AlertDialogTitle>
            <AlertDialogDescription>
              This will clear all group standings and knockout results. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground"
              onClick={() => { resetTournament(); setResetOpen(false); }}
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={fullSimOpen} onOpenChange={setFullSimOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Auto Simulate Full Tournament?</AlertDialogTitle>
            <AlertDialogDescription>
              This will instantly set all 12 group orders and simulate all knockout matches to declare a champion.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { simulateFullTournament(); setFullSimOpen(false); }}>
              Simulate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
