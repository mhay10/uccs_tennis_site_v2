<script lang="ts">
  import EntirePool from "$lib/components/shared/EntirePool.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
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

<style>
  .legend {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: fit-content;
    margin: 0 auto;
    margin-bottom: 5px;
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

  .all-pools {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .pool-scores {
    margin: 0 10px;
  }
</style>
