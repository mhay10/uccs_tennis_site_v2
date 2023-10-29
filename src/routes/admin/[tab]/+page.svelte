<script lang="ts">
  import type { PageData } from "./$types";
  import AddTeams from "$lib/components/admin/AddTeams.svelte";
  import CreatePools from "$lib/components/admin/CreatePools.svelte";
  import ManagePools from "$lib/components/admin/ManagePools.svelte";
  import CreateBrackets from "$lib/components/admin/CreateBrackets.svelte";
  import ManageBrackets from "$lib/components/admin/ManageBrackets.svelte";
  import ManageSchedule from "$lib/components/admin/ManageSchedule.svelte";

  // Contains the current selected tab
  export let data: PageData;
</script>

{#if data.tab === "add-teams"}
  <AddTeams />
{:else if data.tab === "create-pools"}
  <CreatePools />
{:else if data.tab === "manage-pools"}
  <ManagePools />
{:else if data.tab === "create-brackets"}
  <CreateBrackets />
{:else if data.tab === "manage-brackets"}
  <ManageBrackets />
{:else if data.tab === "manage-schedule"}
  <ManageSchedule />
{/if}
