<script lang="ts">
  import type { Bracket } from "$lib/types/bracket";
  import type { Team } from "$lib/types/teams";
  import { onMount } from "svelte";

  export let brackets: Bracket[];

  let poolResults: Team[] = [];

  // Call server to calculate pool results
  onMount(async () => {
    // Get pool results
    const res = await fetch("/api/calculations/pool_results", { method: "POST" });

    // If successful, update poolResults
    if (res.ok) {
      const data = (await res.json()) as { poolResults: Team[] };
      poolResults = data.poolResults;
    } else alert("Something went wrong");

    // Fill brackets with teams from poolResults
    if (poolResults.length > 0) {
      brackets = brackets.map((bracket) => {
        // Add teams to bracket from start of poolResults
        for (let i = 0; i < bracket.teams.length; i++) {
          const newTeam = poolResults.shift();
          if (newTeam) bracket.teams[i] = newTeam;
        }

        // Prebracket no longer needed
        bracket.prebracket = false;

        return bracket;
      });
    }
  });
</script>

<form action="?/populatebrackets" method="post">
  <div class="brackets">
    {#each brackets as bracket}
      <table class="bracket">
        <tr>
          <th class="bracket-name" colspan="2">{bracket._id}</th>
        </tr>
        {#each bracket.teams as team, seed}
          <tr class="team">
            <td>{seed + 1}</td>
            <td>{team._id}</td>
          </tr>
        {/each}
      </table>
    {/each}
  </div>

  <button class="submit" type="submit">Publish Brackets</button>
</form>

<style>
  .brackets {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .bracket {
    border-collapse: collapse;
    border: 1px solid var(--color-2);
    margin: 25px;
  }

  .bracket-name {
    font-size: 16pt;
    padding: 10px;
    background-color: var(--color-1);
  }

  .team {
    border: 1px solid var(--color-2);
  }

  .team :first-child {
    border-right: 1px solid var(--color-2);
  }

  .team td {
    padding: 5px 0;
  }
</style>
