import type { GroupData, GroupId } from "@/lib/types";

// Official group assignments from the 2026 FIFA World Cup draw (December 5, 2025)
// Mexico=A1, Canada=B1, United States=D1 (hosts pre-seeded)
export const groups: GroupData[] = [
  { groupId: "A", teamIds: ["mex", "kor", "rsa", "cze"] },
  { groupId: "B", teamIds: ["can", "swi", "qat", "bih"] },
  { groupId: "C", teamIds: ["bra", "mor", "sco", "hai"] },
  { groupId: "D", teamIds: ["usa", "aus", "par", "tur"] },
  { groupId: "E", teamIds: ["ger", "ecu", "civ", "cur"] },
  { groupId: "F", teamIds: ["ned", "jap", "tun", "swe"] },
  { groupId: "G", teamIds: ["bel", "irn", "egy", "nzl"] },
  { groupId: "H", teamIds: ["esp", "uru", "ksa", "cpv"] },
  { groupId: "I", teamIds: ["fra", "sen", "nor", "irq"] },
  { groupId: "J", teamIds: ["arg", "aut", "alg", "jor"] },
  { groupId: "K", teamIds: ["por", "col", "uzb", "cod"] },
  { groupId: "L", teamIds: ["eng", "cro", "pan", "gha"] },
];

export const groupsMap: Record<GroupId, GroupData> = Object.fromEntries(
  groups.map((g) => [g.groupId, g])
) as Record<GroupId, GroupData>;

export const GROUP_IDS: GroupId[] = ["A","B","C","D","E","F","G","H","I","J","K","L"];
