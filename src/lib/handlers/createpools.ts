import { currentTournament } from "$lib";
import type { Pool } from "$lib/types/pool";
import type { RequestEvent } from "@sveltejs/kit";
import { parse } from "papaparse";

export async function handleCreatePools({ request }: RequestEvent) {
  // Get data from request
  const data = Object.fromEntries(await request.formData());
  const file = data["pool-file"] as File;

  // Parse CSV
  const text = await file.text();
  const csv = parse(text, {
    skipEmptyLines: false,
    header: true
  }).data.slice(0, -1) as any[];

  // Create pools
  const pools = csv.reduce((pools, row) => {
    for (const [poolId, teamId] of Object.entries(row)) {
      // Get pool and team
      const pool = pools.find((pool: Pool) => pool._id === poolId);
      const team = currentTournament.teams.find((team) => team._id === teamId)!;

      // Add team to pool if it exists, otherwise create pool
      if (pool) pool.teams.push(team);
      else pools.push({ _id: poolId, teams: [team] });
    }

    return pools;
  }, []);

  // Save pools
  currentTournament.pools = pools;
  await currentTournament.save();
}
