import type { Team } from "./teams";

export type Bracket = {
  _id: string;
  teams: Team[];
};

export type BracketScore = {
  bracket_id: number;
  team1: Team;
  team2: Team;
  team1_score: number;
  team2_score: number;
  stage: number;
};

export const bracketNames = ["Gold Bracket", "Silver Bracket", "Bronze Bracket", "Copper Bracket"];
