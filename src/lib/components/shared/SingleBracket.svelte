<script lang="ts">
  import { createMatches, sortRounds } from "$lib/handlers/bracketupdate";
  import { stageColors, type Bracket, bye, type BracketScores } from "$lib/types/bracket";

  export let bracket: Bracket;
  export let readonly = false;

  $: {
    // Update bracket with new matches
    bracket.scores = createMatches(bracket.scores, bracket.teams);

    // Merge second round losers into first round losers
    const losersStart = bracket.scores["l1"];
    const secondRoundLosers = bracket.scores["l0.5"];

    for (let i = 0; i < losersStart.length; i++) {
      // Get the loser from the second round
      const index = Math.floor(i / 2);
      const loser = secondRoundLosers[index];

      // Replace bye with loser
      if (i % 2 == 0) {
        if (losersStart[i].team1._id === bye._id) losersStart[i].team1 = loser.team1;
        else losersStart[i].team2 = loser.team1;
      } else {
        if (losersStart[i].team1._id === bye._id) losersStart[i].team1 = loser.team2;
        else losersStart[i].team2 = loser.team2;
      }
    }

    // const losersScores = Object.keys(bracket.scores)
    //   .filter((round) => round[0] === "l" && round !== "l0.5")
    //   .reduce((acc, round) => {
    //     acc[round] = bracket.scores[round];
    //     return acc;
    //   }, {} as BracketScores);

    // console.log(losersScores);
    // bracket.scores = {
    //   ...bracket.scores,
    //   ...createMatches(losersScores, bracket.teams)
    // };

    // console.log(bracket.scores);
  }

  function getColor(round: string) {
    if (round[0] === "l") round = round.slice(1);
    return stageColors[+round % stageColors.length];
  }
</script>

<div class="bracket">
  {#each Object.keys(bracket.scores)
    .filter((round) => round != "l0.5")
    .sort(sortRounds) as round}
    <div class="round">
      <h3>{round}</h3>
      {#each bracket.scores[round] as match}
        <div class="match" style="background-color: {getColor(round)};">
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
