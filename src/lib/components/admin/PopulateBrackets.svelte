<script lang="ts">
  import type { Bracket } from "$lib/types/bracket";
  import type { Pool } from "$lib/types/pool";
  import type { Team } from "$lib/types/teams";

  export let pools: Pool[];
  export let teams: Team[];
  export let brackets: Bracket[];

  async function handleCalculatePositions() {
    const res = await fetch("/api/calculations/pool_results", { method: "POST" });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
    } else alert("Something went wrong");
  }
</script>

<button on:click={handleCalculatePositions}>Calculate Positions</button>

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
