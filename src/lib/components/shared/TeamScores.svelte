<script lang="ts">
  import type { Pool } from "$lib/types/pool";
  import type { Team } from "$lib/types/teams";

  export let team: Team;
  export let otherTeams: Team[];
  export let pool: Pool;
  export let readonly: boolean;
</script>

<table class="scores">
  <tr>
    <th />
    <th />
    <th>{team._id}</th>
  </tr>
  {#each otherTeams as otherTeam}
    {@const scoreIndex = pool.scores.findIndex(
      (s) =>
        (s.team1._id === team._id && s.team2._id === otherTeam._id) ||
        (s.team1._id === otherTeam._id && s.team2._id === team._id)
    )}
    {@const whichSelectedTeam = pool.scores[scoreIndex]?.team1._id === team._id ? "team1" : "team2"}

    <tr>
      <th>{otherTeam._id}</th>
      <td>
        {#if whichSelectedTeam == "team1"}
          <input type="number" bind:value={pool.scores[scoreIndex].team2_score} {readonly} />
        {:else}
          <input type="number" bind:value={pool.scores[scoreIndex].team1_score} {readonly} />
        {/if}
      </td>
      <td>
        {#if whichSelectedTeam == "team1"}
          <input type="number" bind:value={pool.scores[scoreIndex].team1_score} {readonly} />
        {:else}
          <input type="number" bind:value={pool.scores[scoreIndex].team2_score} {readonly} />
        {/if}
      </td>
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
</style>
