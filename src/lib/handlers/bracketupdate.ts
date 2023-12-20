import type { BracketMatch, BracketScores } from "$lib/types/bracket";
import type { Team } from "$lib/types/teams";

const bye: Team = { _id: "bye", name: "Bye" };
const pending: Team = { _id: "pending", name: "Pending" };

export function createMatches(
  teams: Team[],
  round = 0,
  losersBracket = false,
  // @ts-ignore
  scores: BracketScores = {}
): BracketScores {
  if (teams.length < 2) return {} as BracketScores;

  if (round === 0) {
    // Add byes to make number of teams a power of 2
    const needByes = Math.log2(teams.length) % 1 !== 0;
    if (needByes) {
      const numByes = 2 ** Math.ceil(Math.log2(teams.length)) - teams.length;
      for (let i = 0; i < numByes; i++) teams.push(bye);
    }

    // Shuffle teams by seed
    teams = shuffleTeams(teams);
  }

  // Create matches for current round
  const existingMatches = scores[round] || [];
  const matches: BracketMatch[] = [];

  for (let i = 0; i < teams.length; i += 2) {
    // Get teams for current match
    const team1 = teams[i];
    const team2 = teams[i + 1];

    // Check if match already exists
    const existingMatch = existingMatches.find(
      (match) =>
        (match.team1._id === team1._id && match.team2._id === team2._id) ||
        (match.team1._id === team2._id && match.team2._id === team1._id)
    );

    // Add match to list of matches
    if (existingMatch) {
      matches.push(existingMatch);
    } else {
      matches.push({
        team1,
        team2,
        team1_score: 0,
        team2_score: 0
      });
    }
  }

  // Get winners and losers for next round
  const winners = getWinners(matches);
  const losers = getLosers(matches, round, round === 0 ? [] : scores[round - 1]);

  // Create next round of matches
  const winnersNext = createMatches(winners, round + 1, losersBracket, scores);
  let losersNext = {};

  if (round === 0) losersNext = createMatches(losers, round + 1, losersBracket, scores);
  if (round < 0) losersNext = createMatches(winners, round - 1, losersBracket, scores);

  scores = {
    // Current round
    [round]: matches,

    // Next rounds
    ...winnersNext,
    ...losersNext
  };
  return scores;
}

function shuffleTeams(teams: Team[]) {
  // Create copy of teams array to avoid mutating original
  let result = [...teams];

  // Get number of rounds for complete bracket
  const numRounds = Math.log2(teams.length / 2);
  for (let i = 0; i < numRounds; i++) {
    // Create new round
    const round = [];

    // Get number of teams to take from front and back of array
    const splice = Math.pow(2, i);

    // Loop until teams have been added
    while (result.length > 0) {
      // Add teams from front and back of array
      round.push(...result.splice(0, splice));
      round.push(...result.splice(-splice));
    }

    // Set round as new result
    result = round;
  }

  // Return shuffled teams
  return result;
}

function getWinners(matches: BracketMatch[]) {
  const winners = matches.map((match) => {
    // Check if either team is a bye
    if (match.team1._id === "bye") return match.team2;
    if (match.team2._id === "bye") return match.team1;

    // Check if either team is pending
    if (match.team1._id === "pending" || match.team2._id === "pending") return pending;

    // Check if either team won
    if (match.team1_score > match.team2_score) return match.team1;
    else if (match.team2_score > match.team1_score) return match.team2;
    else return pending;
  });

  return winners;
}

function getLosers(matches: BracketMatch[], round: number, prevRoundMatches: BracketMatch[]) {
  // If team had bye and lost in next round, they go to losers bracket
  const losers = matches.map((match) => {
    // Check if either team is a bye
    if (match.team1._id === "bye" || match.team2._id === "bye") return bye;

    // Check if either team is pending
    if (match.team1._id === "pending" || match.team2._id === "pending") return pending;

    if (round === 0) {
      // Check if team lost in current round
      if (match.team1_score > match.team2_score) return match.team2;
      if (match.team2_score > match.team1_score) return match.team1;
    } else if (round === 1 && prevRoundMatches) {
      // Check if team had bye in previous round
      const team1HadBye = prevRoundMatches.find(
        (prevMatch) => prevMatch.team1._id === match.team1._id && prevMatch.team2._id === "bye"
      );
      const team2HadBye = prevRoundMatches.find(
        (prevMatch) => prevMatch.team1._id === match.team2._id && prevMatch.team2._id === "bye"
      );

      // Check if team lost in current round
      if (team1HadBye && match.team2_score > match.team1_score) return match.team1;
      if (team2HadBye && match.team1_score > match.team2_score) return match.team2;
    }

    return pending;
  });

  return losers;
}
