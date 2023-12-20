<script lang="ts">
  import { createMatches } from "$lib/handlers/bracketupdate";
  import type { Bracket } from "$lib/types/bracket";

  export let bracket: Bracket;

  $: {
    bracket.scores = createMatches(bracket.teams);
    console.log(bracket.scores);
  }
</script>

<div>
  {#each Object.keys(bracket.scores).sort((a, b) => +a - +b) as round}
    <div>round</div>
  {/each}
</div>
