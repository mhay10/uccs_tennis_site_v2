<script lang="ts">
  import { page } from "$app/stores";
  import Tabs from "./Tabs.svelte";

  $: console.log($page.url.pathname);
</script>

{#if $page.url.pathname !== "/admin/login"}
  <Tabs />
{/if}

<slot />
