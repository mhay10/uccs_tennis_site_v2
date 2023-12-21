import { bye, type BracketMatch, pending, type Bracket } from "$lib/types/bracket";
import type { Team } from "$lib/types/teams";

export function createFirstRound(teams: Team[]) {
  // Make sure the number of teams is a power of 2
  const numByes = 2 ** Math.ceil(Math.log2(teams.length)) - teams.length;
  for (let i = 0; i < numByes; i++) teams.push(bye);

  // Shuffle the teams by seed
  teams = shuffleTeams(teams);

  // Create the first round
  const round: BracketMatch[] = createMatches(teams);

  return { 0: round };
}

export function createNextRound(
  round: BracketMatch[],
  roundNum: number,
  prevRound: BracketMatch[]
) {
  if (round.length === 1) return {};

  if (roundNum === 0) {
    // Get winners and losers from first round
    const winners = getWinners(round);
    const losers = getLosers(round);

    // Create next rounds
    const winnersRound: BracketMatch[] = createMatches(winners);
    const losersRound: BracketMatch[] = createMatches(losers);

    return { [roundNum + 1]: winnersRound, [roundNum - 1]: losersRound };
  } else if (roundNum === 1) {
    // Get winners and losers from second round
    const winners = getWinners(round);
    let losers = getLosers(round);

    // Make sure losers had bye in first round
    losers = losers.map((team) => {
      const prevMatch = prevRound.find(
        (match) => match.team1._id === team._id || match.team2._id === team._id
      );

      if (prevMatch) {
        const hadBye = prevMatch.team1._id === bye._id || prevMatch.team2._id === bye._id;
        if (hadBye) return team;
      }

      return bye;
    });

    console.log(losers);

    // Create next rounds
    const winnersRound: BracketMatch[] = createMatches(winners);
    const losersRound: BracketMatch[] = createMatches(losers);

    return { [roundNum + 1]: winnersRound, [roundNum - 1.5]: losersRound };
  } else {
    const winners = getWinners(round);
    const nextRound = createMatches(winners);

    return { [roundNum > 0 ? roundNum + 1 : roundNum - 1]: nextRound };
  }
}

function createMatches(teams: Team[]) {
  const matches: BracketMatch[] = [];
  for (let i = 0; i < teams.length; i += 2) {
    const team1 = teams[i];
    const team2 = teams[i + 1];

    const match: BracketMatch = { team1, team2, team1_score: 0, team2_score: 0 };
    matches.push(match);
  }

  return matches;
}

function getWinners(round: BracketMatch[]) {
  return round.map((match) => {
    if (match.team1._id === bye._id) return match.team2;
    if (match.team2._id === bye._id) return match.team1;

    if (match.team1._id === pending._id || match.team2._id === pending._id) return pending;

    if (match.team1_score > match.team2_score) return match.team1;
    if (match.team2_score > match.team1_score) return match.team2;

    return pending;
  });
}

function getLosers(round: BracketMatch[]) {
  return round.map((match) => {
    if (match.team1._id === bye._id || match.team2._id === bye._id) return bye;
    if (match.team1._id === pending._id || match.team2._id === pending._id) return pending;

    if (match.team1_score > match.team2_score) return match.team2;
    if (match.team2_score > match.team1_score) return match.team1;

    return pending;
  });
}

function shuffleTeams(teams: Team[]) {
  let result = [...teams];

  const numRounds = Math.log2(teams.length / 2);
  for (let i = 0; i < numRounds; i++) {
    const round = [];
    const splice = Math.pow(2, i);

    while (result.length) {
      round.push(...result.splice(0, splice));
      round.push(...result.splice(-splice));
    }

    result = round;
  }

  return result;
}
