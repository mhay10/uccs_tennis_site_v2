<script lang="ts">
  import type { Pool } from "$lib/types/pool";
  import type { Team } from "$lib/types/teams";
  import { POOL_HEADERS, validateCSV } from "$lib/validate";
  import { parse } from "papaparse";

  export let teams: Team[];

  // Stores if file can be uploaded
  let validUpload = true;

  async function validateUpload(file: File) {
    // Check if file is a CSV
    const validFormat = await validateCSV(file, POOL_HEADERS);
    if (validFormat) {
      // Get CSV data skipping the header row
      const text = await file.text();
      const rows = parse(text, { header: true, skipEmptyLines: false }).data.slice(0, -1);

      // Merge rows into pools
      let validTeams = true;
      for (const row of rows) {
        if (!validTeams) break;
        // @ts-ignore
        for (const teamId of Object.values(row)) {
          // Find team with matching id
          const team = teams.find((team) => team._id === teamId)!;

          // Exit if team not found
          if (!team) validTeams = false;
        }
      }

      if (!validTeams) {
        alert("Invalid team found. Please check the CSV file and try again.");
        validUpload = false;
      } else validUpload = true;
    } else {
      alert("Invalid CSV format.\nReference the table above for correct format.");
      validUpload = false;
    }
  }
</script>

<form class="create-pools" enctype="multipart/form-data" method="POST" action="?/createpools">
  <label for="team-file">Upload CSV</label>
  <span class="help">
    <small><u>CSV Format</u></small>
    <table class="example">
      <tr>
        <th>Pool 1</th>
        <th>Pool 2</th>
        <th>Pool 3</th>
        <th><i>etc.</i></th>
      </tr>
      <tr>
        <td>Team 1</td>
        <td>Team 2</td>
        <td>Team 3</td>
        <td><i>etc.</i></td>
      </tr>
      <tr>
        <td>Team 4</td>
        <td>Team 5</td>
        <td>Team 6</td>
        <td><i>etc.</i></td>
      </tr>
      <tr>
        <td>Team 7</td>
        <td>Team 8</td>
        <td>Team 9</td>
        <td><i>etc.</i></td>
      </tr>
      <tr>
        <td><i>etc.</i></td>
        <td><i>etc.</i></td>
        <td><i>etc.</i></td>
        <td><i>etc.</i></td>
      </tr>
    </table>
  </span>
  <input
    type="file"
    name="team-file"
    accept="text/csv,text/plain"
    on:change={(e) => {
      if (e.currentTarget.files) validateUpload(e.currentTarget.files[0]);
    }}
    required
  />

  <button type="submit" class="submit" disabled={!validUpload}>Create Pools</button>
</form>

<style>
  .create-pools {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: top;
    width: fit-content;
    margin: 0 auto;
    border: 1px solid var(--color-1);
    padding: 10px;
  }

  .create-pools input {
    margin-bottom: 10px;
    margin-top: 5px;
    border: 1px solid var(--color-1);
    padding: 5px;
  }

  .create-pools .help {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 5px;
  }

  .create-pools .help small {
    margin-bottom: 5px;
  }

  .create-pools .help .example {
    border-collapse: collapse;
    border: 1px solid var(--color-1);
    font-size: 0.8rem;
  }

  .create-pools .help .example th,
  .create-pools .help .example td {
    border: 1px solid var(--color-1);
    padding: 0 5px;
  }
</style>
