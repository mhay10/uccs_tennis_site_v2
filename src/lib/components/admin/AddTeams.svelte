<script lang="ts">
  import type { Team } from "$lib/types/teams";

  export let teams: Team[];
</script>

<div class="forms">
  <form class="add-team single" method="POST" action="?/addteam">
    <label for="team-name">Team Name</label>
    <input type="text" name="team-name" required />
    <label for="team-id">Team ID</label>
    <input type="text" name="team-id" required />
    <button type="submit" class="submit">Add Team</button>
  </form>

  <h1>OR</h1>

  <form class="add-team bulk" enctype="multipart/form-data" method="POST" action="?/addbulk">
    <label for="team-file">Upload CSV</label>
    <span class="help">
      <small><u>CSV Format</u></small>
      <table class="example">
        <tr>
          <th>Team Name</th>
          <th>Team ID</th>
        </tr>
        <tr>
          <td>Team 1</td>
          <td>T1</td>
        </tr>
        <tr>
          <td>Team 2</td>
          <td>T2</td>
        </tr>
        <tr>
          <td><i>etc.</i></td>
          <td><i>etc.</i></td>
        </tr>
      </table>
    </span>
    <input type="file" name="team-file" accept="text/csv" required />
    <button type="submit" class="submit">Add Teams</button>
  </form>
</div>

<br />

<div class="teams-container">
  <table class="teams">
    <tr>
      <th>Team Name</th>
      <th>Team ID</th>
    </tr>
    {#each teams as team}
      <tr>
        <td>{team.name}</td>
        <td>{team._id}</td>
      </tr>
    {/each}
  </table>
</div>

<style>
  .forms {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .add-team {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: top;
    width: fit-content;
    margin: 0 auto;
    border: 1px solid var(--color-1);
    padding: 10px;
  }

  .add-team.single label,
  .add-team.bulk label {
    margin: 5px 0;
  }

  .add-team.single input {
    width: 200px;
    margin-bottom: 10px;
    margin-top: 5px;
  }

  .add-team.bulk input {
    margin-bottom: 10px;
    margin-top: 5px;
    border: 1px solid var(--color-1);
    padding: 5px;
  }

  .add-team.bulk .help {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 5px;
  }

  .add-team.bulk .help small {
    margin-bottom: 5px;
  }

  .add-team.bulk .help .example {
    border-collapse: collapse;
    border: 1px solid var(--color-1);
    font-size: 0.8rem;
  }

  .add-team.bulk .help .example th,
  .add-team.bulk .help .example td {
    border: 1px solid var(--color-1);
    padding: 0 5px;
  }

  .teams-container {
    display: flex;
    justify-content: center;
    overflow-y: auto;
    height: 400px;
    width: fit-content;
    margin: 0 auto;
  }

  .teams {
    border-collapse: collapse;
    text-align: left;
    width: 375px;
  }

  .teams th,
  .teams td {
    padding: 5px;
  }

  .teams th {
    position: sticky;
    top: 0;
    background-color: var(--color-1);
  }

  .teams tr {
    border-bottom: 1px solid var(--color-1);
    transition: background-color 0.13s ease-in-out;
  }

  .teams tr:hover {
    background-color: rgba(255, 0, 0, 0.5);
    transition: background-color 0.13s ease-in-out;
  }
</style>
