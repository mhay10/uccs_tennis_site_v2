import {
  bye,
  type BracketScores,
  type BracketMatch,
  pending,
  type Bracket
} from "$lib/types/bracket";
import type { Team } from "$lib/types/teams";

export function createBracket(
  scores: BracketMatch[][],
  teams: Team[],
  round = 0
): BracketMatch[][] {
  if (teams.length === 1) return [];

  if (round === 0) {
    // Make number of teams power of 2
    const numByes = 2 ** Math.ceil(Math.log2(teams.length)) - teams.length;
    teams = [...teams, ...Array(numByes).fill(bye)];

    // Shuffle teams
    teams = shuffleTeams(teams);
  }

  // Create matches
  const existingMatches = scores[round] || [];
  const matches = [];
  for (let i = 0; i < teams.length; i += 2) {
    const team1 = teams[i];
    const team2 = teams[i + 1];

    // Check if match already exists
    const existingMatch = existingMatches.find(
      (match) =>
        (match.team1._id === team1._id && match.team2._id === team2._id) ||
        (match.team2._id === team1._id && match.team1._id === team2._id)
    );

    // Add match to matches
    matches.push(existingMatch || { team1, team2, team1_score: 0, team2_score: 0 });
  }

  // Create next round
  const nextRound = createBracket(scores, getWinners(matches), round + 1);

  return [matches, ...nextRound];
}

export function getLoserBracketTeams(scores: BracketMatch[][]) {
  const firstRound = scores[0];
  const secondRound = scores[1];

  if (!firstRound || !secondRound) return [];

  // Get teams from first round
  const firstRoundTeams = getLosers(firstRound, scores, 0);
  const secondRoundTeams = getLosers(secondRound, scores, 1);

  for (let i = 0; i < firstRoundTeams.length; i++) {
    const team = firstRoundTeams[i];

    // Skip if valid team
    if (team._id !== bye._id && team._id !== pending._id) {
      console.log("Exiting", team._id);
      continue;
    }

    const j = Math.floor(i / 2);
    firstRoundTeams[i] = secondRoundTeams[j];
  }

  return firstRoundTeams;
}

function shuffleTeams(teams: Team[]) {
  // Create copy of teams array
  let result = [...teams];

  // Calculate number of rounds for loop
  const numRounds = Math.ceil(Math.log2(result.length / 2));
  for (let i = 0; i < numRounds; i++) {
    // Create new round
    const round = [];

    // Calculate number of teams to take from front and back of array
    const numTeams = 2 ** i;

    // Loop until all teams are taken
    while (result.length)
      // Take teams from front and back of array
      round.push(...result.splice(0, numTeams), ...result.splice(-numTeams));

    // Set round to result
    result = round;
  }

  return result;
}

function getWinners(matches: BracketMatch[]) {
  const winners = matches.map((match) => {
    // Return other team if bye
    if (match.team1._id === bye._id) return match.team2;
    if (match.team2._id === bye._id) return match.team1;

    // Return pending if either team pending
    if (match.team1._id === pending._id || match.team2._id === pending._id) return pending;

    // Return team with higher score
    if (match.team1_score > match.team2_score) return match.team1;
    if (match.team2_score > match.team1_score) return match.team2;

    // Return pending if scores are equal
    return pending;
  });

  return winners;
}

function getLosers(currentRound: BracketMatch[], scores: BracketMatch[][], round: number) {
  const losers = currentRound.map((match) => {
    // Return bye if either team is bye
    if (match.team1._id === bye._id || match.team2._id === bye._id) return bye;
    // Return pending if either team pending
    if (match.team1._id === pending._id || match.team2._id === pending._id) return pending;

    // Return team with lower score
    let loser = pending;
    if (match.team1_score < match.team2_score) loser = match.team1;
    if (match.team2_score < match.team1_score) loser = match.team2;

    // Check if loser had bye in previous round
    if (round === 1) {
      const previousRound = scores[round - 1];
      const previousMatch = previousRound.find(
        (match) =>
          (match.team1._id === bye._id && match.team2._id === loser?._id) ||
          (match.team2._id === bye._id && match.team1._id === loser?._id)
      );

      if (previousMatch) return loser;
    }

    return loser;
  });

  return losers;
}
