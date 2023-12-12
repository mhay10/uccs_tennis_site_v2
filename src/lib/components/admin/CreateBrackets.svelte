<script lang="ts">
  import Toggle from "./Toggle.svelte";
  import { bracketNames } from "$lib/handlers/createbrackets";
  import type { Team } from "$lib/types/teams";

  export let teams: Team[];

  let populateBrackets = false;

  // Only submit when all teams are accounted for
  let canSubmit = false;
  $: canSubmit = bracketSizes.reduce((acc, cur) => acc + cur, 0) === teams.length;

  // Control logic for number of brackets
  let numBrackets = 3;

  function addBracket() {
    if (numBrackets < 4) numBrackets++;
  }

  function removeBracket() {
    if (numBrackets > 1) numBrackets--;
  }

  // Control logic for number of teams per bracket
  let bracketSizes: number[] = [];
  $: bracketSizes = new Array(numBrackets).fill(0);

  function addSpot(index: number) {
    bracketSizes[index]++;
  }

  function removeSpot(index: number) {
    bracketSizes[index]--;
  }
</script>

<div class="select-mode">
  <h3>Create Pre-Brackets</h3>
  <Toggle bind:checked={populateBrackets} name="createPreBracket" />
  <h3>Populate Brackets</h3>
</div>

{#if !populateBrackets}
  <form action="?/createbrackets" method="post">
    <label for="numBrackets">Number of Brackets</label>
    <div class="counter">
      <button type="button" class="operator" on:click={removeBracket}><h2>-</h2></button>
      <input type="number" name="numBrackets" bind:value={numBrackets} />
      <button type="button" class="operator" on:click={addBracket}><h2>+</h2></button>
    </div>

    <div class="brackets">
      {#each { length: numBrackets } as _, i}
        <div class="bracket">
          <label for={bracketNames[i]}>{bracketNames[i]}</label>
          <div class="counter">
            <button type="button" class="operator" on:click={() => removeSpot(i)}><h2>-</h2></button
            >
            <input type="number" name={bracketNames[i]} bind:value={bracketSizes[i]} />
            <button type="button" class="operator" on:click={() => addSpot(i)}><h2>+</h2></button>
          </div>
        </div>
      {/each}
    </div>

    <h4>Number of Team Slots: {bracketSizes.reduce((acc, cur) => acc + cur, 0)}</h4>

    <button type="submit" class="submit" disabled={!canSubmit}>Create Pre-Brackets</button>
  </form>
{/if}

<style>
  .select-mode {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .select-mode * {
    padding: 10px;
  }

  .counter {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .counter input[type="number"] {
    font-size: 14pt;
    border: 1px solid var(--color-1);
    border-radius: 10%;
    margin: 0 10px;
  }

  .counter .operator {
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 10%;
  }

  .operator h2 {
    margin: 0;
    font-size: 16pt;
  }

  .brackets {
    margin-top: 25px;
    width: fit-content;
    margin: 25px auto 0;
  }

  .bracket {
    margin-bottom: 10px;
    border: 1px solid var(--color-1);
    padding: 10px;
  }
</style>
