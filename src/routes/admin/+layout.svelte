<script lang="ts">
  import { page } from "$app/stores";
  import Tabs from "./Tabs.svelte";
</script>

{#if $page.url.pathname !== "/admin/login"}
  <Tabs />
  <br />
{/if}

<slot />
