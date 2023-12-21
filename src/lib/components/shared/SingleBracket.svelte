<script lang="ts">
  import { createFirstRound, createNextRound } from "$lib/handlers/bracketupdate";
  import { stageColors, type Bracket } from "$lib/types/bracket";
  import { onMount } from "svelte";

  export let bracket: Bracket;
  export let readonly = false;

  onMount(() => {
    bracket.scores = createFirstRound(bracket.teams);

    const numRounds = Math.ceil(Math.log2(bracket.teams.length));
    for (let i = 1; i < numRounds; i++) {
      const roundNum = i - 1;

      bracket.scores = {
        ...bracket.scores,
        ...createNextRound(bracket.scores[roundNum], roundNum, bracket.scores[roundNum - 1]),
        ...createNextRound(bracket.scores[-roundNum], -roundNum)
      };
    }

    bracket.scores = bracket.scores;
  });

  function handleEnterScore(roundNum: number) {
    bracket.scores = {
      ...bracket.scores,
      ...createNextRound(bracket.scores[roundNum], roundNum, bracket.scores[roundNum - 1]),
      ...createNextRound(bracket.scores[-roundNum], -roundNum)
    };
  }
</script>

<div class="bracket">
  {#each Object.keys(bracket.scores)
    .sort((a, b) => +a - +b)
    .map(Number) as round}
    <div class="round">
      {#each bracket.scores[round] as match}
        <div
          class="match"
          style="background-color: {stageColors[Math.abs(round) % stageColors.length]};"
        >
          <div class="team">
            <p>{match.team1._id}</p>
            <input
              type="number"
              bind:value={match.team1_score}
              {readonly}
              on:input={() => handleEnterScore(round)}
            />
          </div>
          <div class="team">
            <p>{match.team2._id}</p>
            <input
              type="number"
              bind:value={match.team2_score}
              {readonly}
              on:input={() => handleEnterScore(round)}
            />
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
