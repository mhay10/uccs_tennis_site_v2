import type { Team } from "./teams";

export type Bracket = {
  _id: string;
  teams: Team[];
  scores: BracketScores;
  prebracket: boolean;
};

export type BracketScores = {
  [round: string]: BracketMatch[];
};

export type BracketMatch = {
  team1: Team;
  team2: Team;
  team1_score: number;
  team2_score: number;
};

export const bracketNames = ["Gold Bracket", "Silver Bracket", "Bronze Bracket", "Copper Bracket"];
export const stageColors = ["#96C2FF", "#FF9F96", "#96FFAC", "#FFC690", "#FFF486"];

export const bye: Team = { _id: "bye", name: "Bye" };
export const pending: Team = { _id: "pending", name: "Pending" };
