<script lang="ts">
  import type { Bracket } from "$lib/types/bracket";
  import SingleBracket from "$lib/components/shared/SingleBracket.svelte";

  export let brackets: Bracket[];

  let index: number | null = null;
</script>

<select bind:value={index}>
  <option value={null}>-- Select Bracket --</option>
  {#each brackets as bracket, i}
    <option value={i}>{bracket._id}</option>
  {/each}
</select>

{#if index !== null}
  <div>
    <SingleBracket bracket={brackets[index]} />
  </div>
{/if}
