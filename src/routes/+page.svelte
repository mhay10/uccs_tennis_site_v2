<script lang="ts">
  import uccsStatue from "$lib/images/uccs-statue.jpg";
</script>

<svelte:head>
  <title>UCCS Home Tournament</title>
</svelte:head>

<img src={uccsStatue} alt="UCCS Statue" />
<h2>Welcome to the UCCS Home Tournament</h2>
<p>Click on <b>Pool Play</b> or <b>Bracket Play</b> to view current scores.</p>
<p>Click on <b>Schedule</b> to view court availbility and upcoming matches</p>

<style>
  img {
    margin: 0 auto;
    width: 50%;
  }

  h2 {
    margin: 0;
    padding: 1rem;
  }

  p {
    margin: 0;
    padding: 1rem;
  }
</style>
