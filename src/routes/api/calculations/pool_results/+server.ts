import { currentTournament } from "$lib";
import type { Pool, PoolResult, PoolScore } from "$lib/types/pool";
import type { Team } from "$lib/types/teams";
import { json, type RequestEvent } from "@sveltejs/kit";

export async function POST({ request }: RequestEvent) {
  // Check if request is authorized

  // Get pools from database
  const pools = currentTournament.pools;

  // Calculate pool results
  const poolResults = pools.map((pool) => {
    const teamStats = pool.teams.map((team) => getTeamStats(team, pool.scores));

    /* Sort teams by following:
     * No Tie:     Number of wins
     * 2-way Tie:  Higher number of games won
     * 3+ way Tie: Win % (games won / total games)
     */
    teamStats.sort((team1, team2) => {
      if (team1.matches_won !== team2.matches_won) {
        // No tie
        return team2.matches_won - team1.matches_won;
      } else if (team1.games_won !== team2.games_won) {
        // 2-way tie
        return team2.games_won - team1.games_won;
      } else {
        // 3+ way tie
        const team1WinPercent = team1.games_won / team1.total_games;
        const team2WinPercent = team2.games_won / team2.total_games;

        return team2WinPercent - team1WinPercent;
      }
    });

    return { _id: pool._id, teamStats };
  });

  // Merge pool results into single list
  const mergedPoolResults: { team: Team; winPercent: number }[] = [];
  for (const pool of poolResults) {
    const winPercents = pool.teamStats.map((stat, i) => {
      // Calculate win percent and add number based on index
      let winPercent = stat.games_won / stat.total_games;
      ``;
      winPercent += pool.teamStats.length - i;

      return { team: stat.team, winPercent };
    });

    mergedPoolResults.push(...winPercents);
  }

  // Sort merged pool results
  mergedPoolResults.sort((team1, team2) => team2.winPercent - team1.winPercent);

  console.log(mergedPoolResults.length, mergedPoolResults);

  return json({ poolResults: mergedPoolResults.map((result) => result.team) });
}

// Calculate game and match wins/losses for a team
function getTeamStats(team: Team, scores: PoolScore[]): PoolResult {
  const result = {
    team,
    games_won: 0,
    games_lost: 0,
    total_games: 0,
    matches_won: 0,
    matches_lost: 0,
    total_matches: 0
  };

  for (const score of scores) {
    if (score.team1._id === team._id) {
      // Score team1 is this team

      // Increment total games and total matches
      result.total_matches++;
      result.total_games += score.team1_score + score.team2_score;

      // Check if team won or lost
      if (score.team1_score > score.team2_score) {
        result.games_won++;
        result.matches_won++;
      } else {
        result.games_lost++;
        result.matches_lost++;
      }
    } else if (score.team2._id === team._id) {
      // Score team2 is this team

      // Increment total games and total matches
      result.total_matches++;
      result.total_games += score.team1_score + score.team2_score;

      // Check if team won or lost
      if (score.team2_score > score.team1_score) {
        result.games_won++;
        result.matches_won++;
      } else {
        result.games_lost++;
        result.matches_lost++;
      }
    }
  }

  return result;
}
