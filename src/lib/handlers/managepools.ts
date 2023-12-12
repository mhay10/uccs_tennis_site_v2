import {currentTournament} from "$lib";
import type {Pool} from "$lib/types/pool";
import type {RequestEvent} from "@sveltejs/kit";

export async function handleUpdateAllScores({ request }: RequestEvent) {
  // Get pools from request
  const data = Object.fromEntries(await request.formData()) as { pools: string };
  const pools = JSON.parse(data.pools) as Pool[];

  // Update scores for each pool
  for (const pool of pools) {
    const currentPool = currentTournament.pools.find(({ _id }) => _id === pool._id)!;
    currentPool.scores = pool.scores;
  }
  await currentTournament.save();
}

export async function handleUpdateTeamScores({ request }: RequestEvent) {
  // Get data from request
  const data = Object.fromEntries(await request.formData()) as { pool: string };
  const pool = JSON.parse(data.pool) as Pool;

  // Update scores for pool
  const currentPool = currentTournament.pools.find(({ _id }) => _id === pool._id)!;
  currentPool.scores = pool.scores;
  await currentTournament.save();
}
