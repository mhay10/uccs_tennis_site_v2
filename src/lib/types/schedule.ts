import type { Team } from "./teams";

export type Schedule = {
  courts: number[];
  start: Date;
  end: Date;
  team1: Team;
  team2: Team;
};

export type UpcomingMatch = {
  team1: Team;
  team2: Team;
};

export type FinishedMatch = {
  team1: Team;
  team2: Team;
};
