<script lang="ts">
  import type { Pool } from "$lib/types/pool";
  import type { Team } from "$lib/types/teams";
  import EntirePool from "../shared/EntirePool.svelte";
  import SelectTeam from "./SelectTeam.svelte";
  import Toggle from "./Toggle.svelte";

  export let pools: Pool[];
  export let teams: Team[];

  let showAllPools = false;

  async function handleAllPoolsSubmit() {
    const form = new FormData();
    form.append("pools", JSON.stringify(pools));

    const res = await fetch("?/updateallpools", {
      method: "POST",
      body: form
    });

    // Show success or failure message
    if (res.ok && res.status === 200) alert("Successfully updated all pools");
    else alert("Failed to update all pools");

    // Clear the form
    window.location.reload();
  }
</script>

<div class="select-mode">
  <h3>Single Team View</h3>
  <Toggle bind:checked={showAllPools} name="showAllPools" />
  <h3>Pool Overview</h3>
</div>

{#if showAllPools}
  <form method="post" on:submit|preventDefault={handleAllPoolsSubmit}>
    <button type="submit" class="submit">Update Pool Scores</button>
    <small class="legend">
      <span class="red">Red = Top row team score</span>

      <span class="blue">Blue = Left column team score</span>
    </small>
    <div class="all-pools">
      {#each pools as pool}
        <div class="pool-scores">
          <EntirePool bind:pool />
        </div>
      {/each}
    </div>
  </form>
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

  .submit {
    margin-bottom: 10px;
  }

  .legend {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: fit-content;
    margin: 0 auto;
    margin-bottom: 5px;
  }

  .legend .red,
  .legend .blue {
    padding: 1px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid var(--color-3);
    margin: 0;
  }

  .legend .red {
    background-color: rgba(255, 0, 0, 0.5);
  }

  .legend .blue {
    background-color: rgba(0, 0, 255, 0.4);
  }

  .all-pools {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .pool-scores {
    margin: 0 10px;
    flex: 0 0 25%;
  }
</style>
