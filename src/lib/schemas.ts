import { Schema } from "mongoose";

export const activeTournamentSchema = new Schema(
  {
    _id: String,
    active_tournament: String
  },
  { collection: "current_active" }
);

export const tournamentSchema = new Schema(
  {
    // Tournament info
    _id: String,
    name: String,

    // Team organization
    teams: [{ id: String, name: String }],
    pools: [{ id: Number, teams: [{ id: String, name: String }] }],
    brackets: [{ id: Number, teams: [{ id: String, name: String }] }],

    // Scores
    pool_scores: [
      {
        pool_id: Number,
        team1: { id: String, score: Number },
        team2: { id: String, score: Number },
        team1_score: Number,
        team2_score: Number
      }
    ],
    bracket_scores: [
      {
        bracket_id: Number,
        team1: { id: String, score: Number },
        team2: { id: String, score: Number },
        team1_score: Number,
        team2_score: Number,
        stage: Number
      }
    ],

    // Pool play results
    pool_results: [
      {
        id: String,
        name: String,
        games_won: Number,
        games_lost: Number,
        total_games: Number,
        matches_won: Number,
        matches_lost: Number,
        total_matches: Number
      }
    ],

    // Court scheduling
    schedules: [
      {
        courts: [Number],
        start: Date,
        end: Date,
        team1: { id: String, name: String },
        team2: { id: String, name: String }
      }
    ],
    upcoming_matches: [
      { team1: { id: String, name: String }, team2: { id: String, name: String } }
    ],
    finished_matches: [{ team1: { id: String, name: String }, team2: { id: String, name: String } }]
  },
  { collection: "details" }
);
