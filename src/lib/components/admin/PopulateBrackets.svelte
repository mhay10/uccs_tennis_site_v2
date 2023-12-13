<script lang="ts">
  import type { Bracket } from "$lib/types/bracket";
  import type { Pool } from "$lib/types/pool";
  import type { Team } from "$lib/types/teams";

  export let pools: Pool[];
  export let teams: Team[];  
  export let brackets: Bracket[];

  async function handleCalculatePositions(pools: Pool[]) {
    const formData = new FormData();
    formData.append("pools", JSON.stringify(pools));

    const res = await fetch("?/calculatepools", {
      method: "POST",
      body: formData
    });

    console.log(res.ok);
  }
</script>

<button on:click={() => handleCalculatePositions(pools)}>Calculate Positions</button>

<div class="brackets">
  {#each brackets as bracket}
    <div class="bracket">
      <h3>{bracket._id}</h3>
      {#if !bracket.prebracket}
        <ol class="teams">
          {#each bracket.teams as team}
            <li class="team">{team._id}</li>
          {/each}
        </ol>
      {/if}
    </div>
  {/each}
</div>

<style>
  .brackets {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
</style>
