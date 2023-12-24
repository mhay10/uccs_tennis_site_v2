<script lang="ts">
  import { getLoserBracketTeams, createBracket } from "$lib/handlers/bracketupdate";
  import { stageColors, type Bracket, type BracketMatch } from "$lib/types/bracket";

  export let bracket: Bracket;
  export let readonly = false;

  let winnersBracket: BracketMatch[][] = [];
  let losersBracket: BracketMatch[][] = [];

  $: {
    // Create the winners bracket
    winnersBracket = createBracket(winnersBracket, bracket.teams);

    // Create the losers bracket based on the winners bracket
    const losersBracketTeams = getLoserBracketTeams(winnersBracket);
    losersBracket = createBracket(losersBracket, losersBracketTeams, 1);

    console.log(losersBracketTeams.map((team) => team._id));

    // Combine the brackets into one
    bracket.scores = [...losersBracket.reverse(), ...winnersBracket];
  }

  function getColor(index: number, size: number = bracket.scores.length) {
    const middle = Math.floor(size / 2);

    const newColors = stageColors
      .slice(0, middle + 1)
      .concat(stageColors.slice(0, middle).reverse());

    return newColors[index];
  }
</script>

<div class="bracket">
  {#each bracket.scores as round, i}
    <div class="round">
      {#each round as match}
        <div class="match" style="background-color: {getColor(i)};">
          <div class="team">
            <p>{match.team1._id}</p>
            <input type="number" bind:value={match.team1_score} {readonly} />
          </div>
          <div class="team">
            <p>{match.team2._id}</p>
            <input type="number" bind:value={match.team2_score} {readonly} />
          </div>
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .bracket {
    display: flex;
    flex-direction: row;
    width: fit-content;
    margin: auto;
  }

  .round {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /* height: 100%; */
  }

  .match {
    margin: 10px;
    border: 1px solid var(--color-2);
  }

  .team {
    display: flex;
    flex-direction: row;
    flex: 0 0 50%;
    justify-content: space-between;
    padding: 5px;
  }

  .team * {
    margin: 0;
    padding-right: 10px;
  }
</style>
