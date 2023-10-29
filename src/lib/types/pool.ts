import type { Team } from "./teams";

export type Pool = {
  _id: number;
  teams: Team[];
};

export type PoolScore = {
  pool_id: number;
  team1: Team;
  team2: Team;
  team1_score: number;
  team2_score: number;
};

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