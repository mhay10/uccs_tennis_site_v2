import {
  bye,
  type BracketScores,
  type BracketMatch,
  pending,
  type Bracket
} from "$lib/types/bracket";
import type { Team } from "$lib/types/teams";

export function sortRounds(a: string, b: string) {
  // Sort by round from losers to winners
  if (a[0] === "l" && b[0] !== "l") return -1;
  if (a[0] !== "l" && b[0] === "l") return 1;
  if (a[0] === "l" && b[0] === "l") return +b.slice(1) - +a.slice(1);
  return +a - +b;
}

export function createMatches(
  scores: BracketScores,
  teams: Team[],
  round = "0",
  losersBracket = false
): BracketScores {
  if (teams.length === 1) return {};

  // First round setup
  if (round === "0") {
    // Add byes to make number of teams a power of 2
    const numByes = 2 ** Math.ceil(Math.log2(teams.length)) - teams.length;
    if (numByes > 0) for (let i = 0; i < numByes; i++) teams.push(bye);

    // Shuffle teams by seed
    teams = shuffleTeams(teams);
  }

  // Create matches
  const roundKey = losersBracket ? `l${round.slice(1)}` : round;
  const existingMatches = scores[roundKey] || [];
  const matches: BracketMatch[] = [];

  for (let i = 0; i < teams.length; i += 2) {
    const team1 = teams[i];
    const team2 = teams[i + 1];

    // Check if match already exists
    const existingMatch = existingMatches.find(
      (match) =>
        (match.team1 === team1 && match.team2 === team2) ||
        (match.team1 === team2 && match.team2 === team1)
    );

    // Add match to matches
    if (existingMatch) matches.push(existingMatch);
    else matches.push({ team1, team2, team1_score: 0, team2_score: 0 });
  }

  // Return only current round if round if losers from second round
  if (round === "l0.5") return { [roundKey]: matches };

  // Create next round
  const winnersNext = createMatches(scores, getWinners(matches), `${+round + 1}`);
  let losersStart = {};
  let secondLosersStart = {};
  let losersNext = {};

  if (round === "0")
    losersStart = createMatches(scores, getLosers(matches, scores, round), "l1", true);
  if (round === "1")
    secondLosersStart = createMatches(scores, getLosers(matches, scores, round), "l0.5", true);
  if (losersBracket)
    losersNext = createMatches(scores, getWinners(matches), `l${+round.slice(1) + 1}`, true);

  // Return matches
  return {
    // Current round
    [roundKey]: matches,

    // Next rounds
    ...winnersNext,
    ...losersStart,
    ...secondLosersStart,
    ...losersNext
  };
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

function getLosers(currentRound: BracketMatch[], scores: BracketScores, round: string) {
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
    if (loser._id != pending._id && round === "1") {
      const prevMatch = scores["0"]?.find(
        (prevMatch) =>
          (prevMatch.team1._id === loser._id && prevMatch.team2._id === bye._id) ||
          (prevMatch.team2._id === loser._id && prevMatch.team1._id === bye._id)
      );

      if (prevMatch) return loser;
    }

    return loser;
  });

  return losers;
}
