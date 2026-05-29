"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import ExportButtons from "@/components/ExportButtons";
import type { SimulationRandomness } from "@/lib/types";
import { toast } from "sonner";

export default function SettingsPage() {
  const randomness = useTournamentStore((s) => s.randomness);
  const setRandomness = useTournamentStore((s) => s.setRandomness);
  const resetTournament = useTournamentStore((s) => s.resetTournament);
  const saveToLocalStorage = useTournamentStore((s) => s.saveToLocalStorage);
  const loadFromLocalStorage = useTournamentStore((s) => s.loadFromLocalStorage);

  const [resetOpen, setResetOpen] = useState(false);

  function handleSave() {
    saveToLocalStorage();
    toast.success("Progress saved to browser storage!");
  }

  function handleLoad() {
    loadFromLocalStorage();
    toast.success("Saved simulation loaded!");
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Configure simulation behavior and manage data.</p>
      </div>

      {/* Simulation */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Simulation Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="randomness">Randomness Level</Label>
            <Select
              value={randomness}
              onValueChange={(v) => setRandomness(v as SimulationRandomness)}
            >
              <SelectTrigger id="randomness" className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low — Favorites almost always win</SelectItem>
                <SelectItem value="MEDIUM">Medium — Balanced results</SelectItem>
                <SelectItem value="HIGH">High — Many upsets possible</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Controls how much team ratings influence simulated outcomes.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save / Load */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Save & Load Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2 flex-wrap">
            <Button variant="default" size="sm" onClick={handleSave}>
              Save to Browser
            </Button>
            <Button variant="outline" size="sm" onClick={handleLoad}>
              Load from Browser
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Saves to your browser's localStorage. Clearing browser data will erase this.
          </p>
        </CardContent>
      </Card>

      {/* Export / Import */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Export & Import</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <ExportButtons />
          <p className="text-xs text-muted-foreground">
            Download the full simulation as JSON, export group tables as CSV, or import a previously saved simulation.
          </p>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-destructive/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" size="sm" onClick={() => setResetOpen(true)}>
            Reset Full Tournament
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Clears all scores, standings, and knockout results. Cannot be undone.
          </p>
        </CardContent>
      </Card>

      <AlertDialog open={resetOpen} onOpenChange={setResetOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Tournament?</AlertDialogTitle>
            <AlertDialogDescription>
              All match results, standings, and bracket data will be permanently cleared.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground"
              onClick={() => { resetTournament(); setResetOpen(false); toast.success("Tournament reset."); }}
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
