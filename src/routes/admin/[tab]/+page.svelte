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

  // Global event listener for all input[type="number"] elements to select all text on focus
  document.addEventListener(
    "focus",
    (e) => e.target instanceof HTMLInputElement && e.target.type === "number" && e.target.select(),
    true
  );
</script>

{#if data.tab === "add-teams"}
  <AddTeams teams={data.teams} />
{:else if data.tab === "create-pools"}
  <CreatePools pools={data.pools} teams={data.teams} />
{:else if data.tab === "manage-pools"}
  <ManagePools pools={data.pools} teams={data.teams} />
{:else if data.tab === "create-brackets"}
  <CreateBrackets teams={data.teams} />
{:else if data.tab === "manage-brackets"}
  <ManageBrackets />
{:else if data.tab === "manage-schedule"}
  <ManageSchedule />
{/if}
