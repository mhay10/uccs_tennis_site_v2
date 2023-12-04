<script lang="ts">
  import EntirePool from "$lib/components/shared/EntirePool.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  let poolIndex: number | null = null;

  async function handlePoolChange(e: any) {
    // TODO: Figure out why this is necessary
    const index = e.target.value as number;
    poolIndex = null;
    await new Promise((r) => setTimeout(r, 50));
    poolIndex = index;
  }
</script>

<h2>Pool Play</h2>

<small class="legend">
  <span class="red">Red = Top row team score</span>
  <span class="blue">Blue = Left column team score</span>
</small>
<div class="all-pools">
  {#each data.pools as pool}
    <div class="pool-scores">
      <EntirePool {pool} readonly={true} />
    </div>
  {/each}
</div>

<div class="select-pool">
  <h3>Select Pool</h3>
  <select class="selection" bind:value={poolIndex} on:change={handlePoolChange}>
    <option value={null}>-- Select Pool --</option>
    {#each data.pools as pool, i}
      <option value={i}>{pool._id}</option>
    {/each}
  </select>

  {#if poolIndex != null}
    <div class="pool">
      <EntirePool pool={data.pools[poolIndex]} readonly={true} />
    </div>
  {/if}
</div>

<style>
  .legend {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: fit-content;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  .legend .red,
  .legend .blue {
    padding: 1px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid var(--color-3);
    margin: 0;
  }

  .legend .red {
    background-color: rgba(255, 0, 0, 0.5);
  }

  .legend .blue {
    background-color: rgba(0, 0, 255, 0.4);
  }

  .select-pool {
    visibility: hidden;
  }

  .all-pools {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .pool-scores {
    display: flex;
    flex-wrap: wrap;
    flex: 0 0 25%;
    margin: 0 10px;
  }

  /* Mobile view */
  @media screen and (max-width: 1000px) {
    .legend {
      margin-bottom: 0;
    }

    .select-pool {
      visibility: visible;
    }

    .selection {
      margin-bottom: 20px;
    }

    .all-pools {
      display: none;
    }

    .pool-scores {
      margin: 0;
    }
  }
</style>
