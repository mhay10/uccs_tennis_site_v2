<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<pre>{JSON.stringify(data.activeTournament, null, "  ")}</pre>
<br />
<pre>{JSON.stringify(data.tournaments, null, "  ")}</pre>

<style>
  pre {
    text-align: left;
  }
</style>
