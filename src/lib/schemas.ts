import { Schema } from "mongoose";

export const teamSchema = new Schema({
  id: String,
  name: String
});

export const poolSchema = new Schema({
  id: Number,
  teams: [teamSchema]
});

export const poolScoresSchema = new Schema({
  pool_id: Number,
  scores: [
    new Schema({
      team1: teamSchema,
      team2: teamSchema,
      team1_score: Number,
      team2_score: Number
    })
  ]
});

export const bracketSchema = new Schema({
  id: Number,
  name: String,
  teams: [teamSchema]
});

export const bracketScoresSchema = new Schema({
  bracket_id: Number,
  scores: [
    new Schema({
      team1: teamSchema,
      team2: teamSchema,
      team1_score: Number,
      team2_score: Number,
      stage: String
    })
  ]
});

export const scheduleSchema = new Schema({
  courtPair: [Number],
  start: Date,
  end: Date,
  match: [
    new Schema({
      team1: teamSchema,
      team2: teamSchema
    })
  ]
});

export const upcomingMatchSchema = new Schema({
  team1: teamSchema,
  team2: teamSchema,
});

export const finishedMatchSchema = new Schema({
  team1: teamSchema,
  team2: teamSchema,
});

export const tournamentSchema = new Schema({
  _id: String,
  pools: [poolSchema],
  poolScores: [poolScoresSchema],
  brackets: [bracketSchema],
  bracketScores: [bracketScoresSchema],
  schedule: [scheduleSchema],
  upcomingMatches: [upcomingMatchSchema],
  finishedMatches: [finishedMatchSchema]
});
