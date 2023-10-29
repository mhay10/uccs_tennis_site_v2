<script lang="ts">
  import type { Tournament } from "$lib/types/tournament";
  import type { PageData } from "./$types";

  export let data: PageData;

  let activeTournament = JSON.parse(data.activeTournament) as Tournament;
  let tournaments = JSON.parse(data.tournaments) as Tournament[];
</script>

<form class="current-active" method="POST" action="?/tournament">
  <div class="get-existing">
    <h3>Select Existing Tournament</h3>
    <select name="existing-tournament-id">
      <option selected value={activeTournament._id || -1}
        >{activeTournament.name || "-- Select Tournament --"}</option
      >
      {#each tournaments as tournament}
        <option value={tournament._id}>{tournament.name}</option>
      {/each}
    </select>
  </div>

  <h4>OR</h4>

  <div class="create-new">
    <h3>Create New Tournament</h3>
    <span class="row">
      <label for="tournament-id">Tournament ID </label>
      <input type="text" name="tournament-id" />
    </span>
    <span class="row">
      <label for="tournament-name">Tournament Name </label>
      <input type="text" name="tournament-name" />
    </span>
  </div>

  <button type="submit" class="submit">Save</button>
</form>

<style>
  .current-active {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid var(--color-1);
    width: fit-content;
    margin: 0 auto;
    padding: 0 15px;
    padding-bottom: 15px;
  }

  .get-existing,
  .create-new {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 15px;
  }

  .create-new {
    margin-bottom: 15px;
  }

  .create-new h3 {
    margin-top: 5px;
  }

  .create-new .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 5px;
    padding: 0 5px;
  }
</style>
