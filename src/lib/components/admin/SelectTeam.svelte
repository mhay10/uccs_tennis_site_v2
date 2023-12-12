<script lang="ts">
  import type { Pool } from "$lib/types/pool";
  import type { Team } from "$lib/types/teams";
  import TeamScores from "./TeamScores.svelte";

  export let pools: Pool[];
  export let teams: Team[];
  export let readonly = false;

  let team: Team;
  let pool: Pool;
  let showScores = false;

  function handleTeamSelect(e: any) {
    let teamId = e.target.value;
    if (teamId) {
      // Set team and pool if team is selected
      team = teams.find((t) => t._id === teamId)!;
      pool = pools.find((p) => p.teams.findIndex((t) => t._id === teamId) !== -1)!;
      showScores = true;
    } else showScores = false;
  }

  async function handleTeamScoresSubmit() {
    // Create form data
    const form = new FormData();
    form.append("pool", JSON.stringify(pool));

    // Send request
    const res = await fetch("?/updateteamscores", {
      method: "POST",
      body: form
    });

    // Show success or failure message
    if (res.ok && res.status === 200) alert("Successfully updated team scores");
    else alert("Failed to update team scores");

    // Clear the form
    window.location.reload();
  }
</script>

<form class="enter-scores" method="POST" on:submit|preventDefault={handleTeamScoresSubmit}>
  <div class="select-team">
    <label for="team">Select Team</label>
    <select name="team" on:change={handleTeamSelect}>
      <option value="" selected>-- Select Team --</option>
      {#each teams as team}
        <option value={team._id}>{team._id}</option>
      {/each}
    </select>
  </div>

  {#if showScores}
    {@const otherTeams = pool.teams.filter((t) => t._id !== team._id)}

    <TeamScores {team} {otherTeams} bind:pool {readonly} />

    {#if !readonly}
      <button type="submit" class="submit">Save</button>
    {/if}
  {/if}
</form>

<style>
  .enter-scores {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .select-team {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .select-team label {
    margin-bottom: 5px;
  }
</style>
