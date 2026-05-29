"use client";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useTournamentStore } from "@/store/tournamentStore";
import { toast } from "sonner";

export default function ExportButtons() {
  const exportJSON = useTournamentStore((s) => s.exportAsJSON);
  const exportCSV = useTournamentStore((s) => s.exportCSV);
  const importFromJSON = useTournamentStore((s) => s.importFromJSON);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const raw = ev.target?.result as string;
      const ok = importFromJSON(raw);
      if (ok) toast.success("Simulation imported successfully!");
      else toast.error("Invalid simulation file.");
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Button size="sm" variant="outline" onClick={exportJSON}>
        Download JSON
      </Button>
      <Button size="sm" variant="outline" onClick={exportCSV}>
        Export Groups CSV
      </Button>
      <Button size="sm" variant="outline" onClick={() => fileRef.current?.click()}>
        Import JSON
      </Button>
      <input
        ref={fileRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleImport}
      />
    </div>
  );
}
