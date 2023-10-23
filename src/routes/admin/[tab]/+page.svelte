<script lang="ts">
  import type { PageData } from "./$types";
  import AddTeams from "$lib/components/admin/AddTeams.svelte";
  import CreatePools from "$lib/components/admin/CreatePools.svelte";
  import ManagePools from "$lib/components/admin/ManagePools.svelte";
  import CreateBrackets from "$lib/components/admin/CreateBrackets.svelte";
  import ManageBrackets from "$lib/components/admin/ManageBrackets.svelte";
  import ManageSchedule from "$lib/components/admin/ManageSchedule.svelte";
  import { page } from "$app/stores";

  // Contains the current selected tab
  export let data: PageData;
</script>

{#if $page.url.pathname.endsWith("add-teams")}
  <AddTeams />
{:else if $page.url.pathname.endsWith("create-pools")}
  <CreatePools />
{:else if $page.url.pathname.endsWith("manage-pools")}
  <ManagePools />
{:else if $page.url.pathname.endsWith("create-brackets")}
  <CreateBrackets />
{:else if $page.url.pathname.endsWith("manage-brackets")}
  <ManageBrackets />
{:else if $page.url.pathname.endsWith("manage-schedule")}
  <ManageSchedule />
{/if}

