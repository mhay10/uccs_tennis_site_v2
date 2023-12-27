import { Schema } from "mongoose";

export const activeTournamentSchema = new Schema(
  {
    _id: { type: String, required: true },
    active_tournament: { type: String, required: true }
  },
  { collection: "current_active" }
);

export const tournamentSchema = new Schema(
  {
    // Tournament info
    _id: { type: String, required: true },
    name: { type: String, required: true },

    // Team organization
    teams: [{ _id: { type: String, required: true }, name: { type: String, required: true } }],
    pools: [
      {
        _id: { type: String, required: true },
        teams: [{ _id: { type: String, required: true }, name: { type: String, required: true } }],
        scores: [
          {
            team1: {
              type: {
                _id: { type: String, required: true },
                name: { type: String, required: true }
              },
              required: true
            },
            team2: {
              type: {
                _id: { type: String, required: true },
                name: { type: String, required: true }
              },
              required: true
            },
            team1_score: { type: Number, required: true },
            team2_score: { type: Number, required: true }
          }
        ]
      }
    ],
    brackets: [
      {
        _id: { type: String, required: true },
        teams: [{ _id: { type: String, required: true }, name: { type: String, required: true } }],
        scores: [
          [
            {
              team1: {
                type: {
                  _id: { type: String, required: true },
                  name: { type: String, required: true }
                },
                required: true
              },
              team2: {
                type: {
                  _id: { type: String, required: true },
                  name: { type: String, required: true }
                },
                required: true
              },
              team1_score: { type: Number, required: true },
              team2_score: { type: Number, required: true }
            }
          ]
        ],
        prebracket: { type: Boolean, required: true }
      }
    ],

    // Pool play results
    pool_results: [
      {
        _id: { type: String, required: true },
        team: { _id: { type: String, required: true }, name: { type: String, required: true } },
        games_won: { type: Number, required: true },
        games_lost: { type: Number, required: true },
        total_games: { type: Number, required: true },
        matches_won: { type: Number, required: true },
        matches_lost: { type: Number, required: true },
        total_matches: { type: Number, required: true }
      }
    ],

    // Court scheduling
    schedules: [
      {
        courts: [{ type: Number, required: true }],
        start: { type: Date, required: true },
        end: { type: Date, required: true },
        team1: { _id: { type: String, required: true }, name: { type: String, required: true } },
        team2: { _id: { type: String, required: true }, name: { type: String, required: true } }
      }
    ],
    upcoming_matches: [
      {
        team1: { _id: { type: String, required: true }, name: { type: String, required: true } },
        team2: { _id: { type: String, required: true }, name: { type: String, required: true } }
      }
    ],
    finished_matches: [
      {
        team1: { _id: { type: String, required: true }, name: { type: String, required: true } },
        team2: { _id: { type: String, required: true }, name: { type: String, required: true } }
      }
    ]
  },
  { collection: "details" }
);
``;
