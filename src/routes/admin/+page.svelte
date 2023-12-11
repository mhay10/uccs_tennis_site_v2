<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  const { tournaments, currentTournament } = data;
</script>

<h2>Current Tournament</h2>
<h4>{currentTournament.name}</h4>
<br />

<div class="forms">
  <form class="select-existing" method="POST" action="?/existingtournament">
    <h3>Select Existing Tournament</h3>
    <select name="tournament-id">
      <option selected value={currentTournament._id || -1}
        >{currentTournament.name || "-- Select Tournament --"}</option
      >
      {#each tournaments as tournament}
        <option value={tournament._id}>{tournament.name}</option>
      {/each}
    </select>

    <button type="submit" class="submit">Save</button>
  </form>

  <h4>OR</h4>

  <form class="create-new" method="POST" action="?/newtournament">
    <h3>Create New Tournament</h3>
    <span class="row">
      <label for="tournament-id">Tournament ID </label>
      <input type="text" name="tournament-id" required />
    </span>
    <span class="row">
      <label for="tournament-name">Tournament Name </label>
      <input type="text" name="tournament-name" required />
    </span>

    <button type="submit" class="submit">Save</button>
  </form>
</div>

<style>
  .forms {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }

  .select-existing {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--color-1);
    padding: 10px;
  }

  .select-existing select {
    margin-bottom: 10px;
  }

  .create-new {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--color-1);
    padding: 10px;
  }

  .create-new .row {
    display: flex;
    flex-direction: row;
    text-align: left;
    margin-bottom: 10px;
  }

  .create-new .row label {
    width: 150px;
  }

  .create-new .row input {
    width: 200px;
  }
</style>
