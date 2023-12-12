import type {Team} from "./teams";

export type Pool = {
  _id: string;
  teams: Team[];
  scores: PoolScore[];
};

export type PoolScore = {
  team1: Team;
  team2: Team;
  team1_score: number;
  team2_score: number;
}

export type PoolResult = {
  _id: string;
  team: Team;
  games_won: number;
  games_lost: number;
  total_games: number;
  matches_won: number;
  matches_lost: number;
  total_matches: number;
};
