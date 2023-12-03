<script lang="ts">
  import type { Pool } from "$lib/types/pool";
  import type { Team } from "$lib/types/teams";

  export let pool: Pool;
  export let readonly = false;

  let topRowTeams = pool.teams.slice(0, -1);
  let firstColumnTeams = pool.teams.slice(1);
</script>

<table class="scores">
  <tr>
    <th />
    {#each topRowTeams as team}
      <th>{team._id}</th>
    {/each}
  </tr>
  {#each firstColumnTeams as team, row}
    <tr>
      <th class="team">{team._id}</th>
      {#each topRowTeams as topRowTeam, col}
        <td>
          {#if team._id === topRowTeam._id || row < col}
            <span class="na" />
          {:else}
            {@const scoreIndex = pool.scores.findIndex(
              (s) =>
                (s.team1._id === team._id && s.team2._id === topRowTeam._id) ||
                (s.team1._id === topRowTeam._id && s.team2._id === team._id)
            )}
            {@const topIsTeam1 = pool.scores[scoreIndex]?.team1._id === topRowTeam._id}

            <div class="vs-score">
              <span class="score top-row">
                {#if topIsTeam1}
                  <input
                    type="number"
                    bind:value={pool.scores[scoreIndex].team1_score}
                    {readonly}
                  />
                {:else}
                  <input
                    type="number"
                    bind:value={pool.scores[scoreIndex].team2_score}
                    {readonly}
                  />
                {/if}
              </span>
              <span class="score first-col">
                {#if topIsTeam1}
                  <input
                    type="number"
                    bind:value={pool.scores[scoreIndex].team2_score}
                    {readonly}
                  />
                {:else}
                  <input
                    type="number"
                    bind:value={pool.scores[scoreIndex].team1_score}
                    {readonly}
                  />
                {/if}
              </span>
            </div>
          {/if}
        </td>
      {/each}
    </tr>
  {/each}
</table>

<style>
  .scores {
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  .scores th,
  .scores td {
    padding: 5px 10px;
    border: 1px solid var(--color-2);
  }

  .scores th {
    background-color: var(--color-1);
  }

  .team {
    width: 75px;
  }

  .vs-score {
    display: inline-grid;
    width: 100%;
  }

  .score.top-row {
    background: red;
    grid-column: 2;
  }

  .score.first-col {
    background: blue;
    grid-row: 2;
  }

  td:has(.na) {
    background: linear-gradient(
        to top left,
        transparent 49.5%,
        var(--color-3) 50%,
        var(--color-3) 50%,
        transparent 51%
      ),
      linear-gradient(
        to top right,
        transparent 49.5%,
        var(--color-3) 50%,
        var(--color-3) 50%,
        transparent 51%
      );
  }
</style>
