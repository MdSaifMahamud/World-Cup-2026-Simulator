"use client";
import { teamsMap } from "@/data/teams";

interface Props {
  teamId?: string | null;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  showFlag?: boolean;
}

export default function TeamBadge({ teamId, placeholder, size = "md", showFlag = true }: Props) {
  const team = teamId ? teamsMap[teamId] : null;

  const sizeClasses = {
    sm: "text-xs gap-1",
    md: "text-sm gap-1.5",
    lg: "text-base gap-2 font-semibold",
  };

  if (!team) {
    return (
      <span className={`inline-flex items-center ${sizeClasses[size]} text-muted-foreground italic`}>
        {placeholder ?? "TBD"}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center ${sizeClasses[size]}`}>
      {showFlag && team.flagEmoji && (
        <span className={size === "sm" ? "text-base" : "text-lg"}>{team.flagEmoji}</span>
      )}
      <span>{size === "sm" ? team.shortName : team.name}</span>
    </span>
  );
}
