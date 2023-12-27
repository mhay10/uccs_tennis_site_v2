<script lang="ts">
  import { getLoserBracketTeams, createBracket } from "$lib/handlers/bracketupdate";
  import { stageColors, type Bracket, type BracketMatch } from "$lib/types/bracket";
  import { afterUpdate } from "svelte";

  export let bracket: Bracket;
  export let readonly = false;

  let winnersBracket: BracketMatch[][] = [];
  let losersBracket: BracketMatch[][] = [];

  $: {
    // Create the winners bracket
    winnersBracket = createBracket(winnersBracket, bracket.teams);

    // Create the losers bracket based on the winners bracket
    const losersBracketTeams = getLoserBracketTeams(winnersBracket);
    losersBracket = createBracket(losersBracket, losersBracketTeams, 1, true);

    // Combine the brackets into one
    bracket.scores = [...losersBracket.toReversed(), ...winnersBracket];
  }

  function getColor(index: number, size: number = bracket.scores.length) {
    // Get the middle index of the array
    const middle = Math.floor(size / 2);

    // Create a new array with the colors in the correct order
    const newColors = stageColors
      .slice(0, middle + 1)
      .concat(stageColors.slice(0, middle).toReversed());

    // Return correct color
    return newColors[index];
  }
</script>

<div class="bracket">
  {#each bracket.scores as round, i}
    {@const middle = Math.floor(bracket.scores.length / 2)}
    {@const isLosers = i <= middle && i !== 0}
    {@const isWinners = i >= middle && i !== bracket.scores.length - 1}

    <div class="round" class:winners={isWinners} class:losers={isLosers}>
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
  }

  .match {
    margin: 6px 8px;
    border: 1px solid var(--color-2);
    padding: 0 5px;
    position: relative;
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

  .round.winners .match::after {
    content: "";
    position: absolute;
    left: 100%;
    width: 50%;
    height: 100%;
  }

  .round.losers .match::before {
    content: "";
    position: absolute;
    right: 100%;
    width: 50%;
    height: 100%;
  }

  .round.winners:nth-last-child(2) .match::after,
  .round.losers:nth-child(2) .match::before {
    height: 200%;
  }

  /* Winners Bracket Connections */
  .round.winners .match:nth-of-type(odd)::after {
    top: 50%;
    border-top: 1px solid var(--color-2);
    border-right: 1px solid var(--color-2);
  }

  .round.winners .match:nth-of-type(even)::after {
    top: -50%;
    border-bottom: 1px solid var(--color-2);
    border-right: 1px solid var(--color-2);
  }

  .round.winners:nth-last-child(2) .match:nth-of-type(even)::after {
    top: -150%;
  }

  /* Losers Bracket Connections */
  .round.losers .match:nth-of-type(odd)::before {
    top: 50%;
    border-top: 1px solid var(--color-2);
    border-left: 1px solid var(--color-2);
    z-index: -1;
  }

  .round.losers .match:nth-of-type(even)::before {
    top: -50%;
    border-bottom: 1px solid var(--color-2);
    border-left: 1px solid var(--color-2);
    z-index: -1;
  }

  .round.losers:nth-child(2) .match:nth-of-type(even)::before {
    top: -150%;
  }
</style>
