"use client";
import { teamsMap } from "@/data/teams";
import FlagImage from "./FlagImage";

interface Props {
  teamId?: string | null;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  showFlag?: boolean;
}

export default function TeamBadge({ teamId, placeholder, size = "md", showFlag = true }: Props) {
  const team = teamId ? teamsMap[teamId] : null;

  const textClass = {
    sm: "text-xs gap-1.5",
    md: "text-sm gap-2",
    lg: "text-base gap-2 font-semibold",
  }[size];

  const flagSize = size === "lg" ? "md" : "sm";

  if (!team) {
    return (
      <span className={`inline-flex items-center ${textClass} text-muted-foreground italic`}>
        {placeholder ?? "TBD"}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center ${textClass}`}>
      {showFlag && (
        <FlagImage
          isoCode={team.isoCode}
          name={team.name}
          size={flagSize}
          fallbackEmoji={team.flagEmoji}
        />
      )}
      <span>{size === "sm" ? team.shortName : team.name}</span>
    </span>
  );
}
