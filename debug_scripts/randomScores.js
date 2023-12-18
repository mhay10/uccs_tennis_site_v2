/**
 * This script is used to generate random scores between teams for each pool in the tournament.
 * It is used to test the tournament bracket.
 */

const { get } = require("mongoose");

// Use the tournament database
use("tournaments");

// Get specified tournament
const tournamentId = "HomeSpring2024";
const tournament = db.details.findOne({ _id: tournamentId });
console.log("\nUsing Tournament: ", tournament._id, "\n");

// Create random scores for each pool
const newPools = createRandomScores(tournament.pools);
console.log("Generated random scores for each pool...");

// Save tournament
db.details.updateOne({ _id: tournamentId }, { $set: { pools: newPools } });

console.log("Tournament updated with random scores...");

console.log("\n==============================================");
console.log("DO NOT FORGET TO RESTART SERVER TO SEE CHANGES");
console.log("==============================================\n");

function createRandomScores(pools) {
  const modifiedPools = [...pools];

  // Create random scores for each pool
  for (const pool of modifiedPools) {
    for (const score of pool.scores) {
      score.team1_score = getRandomInt(0, 30);
      score.team2_score = getRandomInt(0, 30);
    }
  }

  return modifiedPools;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
