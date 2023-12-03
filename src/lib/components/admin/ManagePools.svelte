<script lang="ts">
  import type { Pool, PoolScore } from "$lib/types/pool";
  import type { Team } from "$lib/types/teams";
  import EntirePool from "../shared/EntirePool.svelte";
  import SelectTeam from "../shared/SelectTeam.svelte";
  import Toggle from "../shared/Toggle.svelte";

  export let pools: Pool[];
  export let teams: Team[];

  let showAllPools = true;
</script>

<div class="select-mode">
  <h3>Single Team View</h3>
  <Toggle bind:checked={showAllPools} name="showAllPools" />
  <h3>Pool Overview</h3>
</div>

{#if showAllPools}
  <div class="all-pools">
    {#each pools as pool}
      <div class="pool-scores">
        <EntirePool {pool} />
      </div>
    {/each}
  </div>
{:else}
  <SelectTeam {pools} {teams} />
{/if}

<style>
  .select-mode {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .select-mode * {
    padding: 10px;
  }

  .all-pools {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .pool-scores {
    margin: 10px;
  }
</style>
