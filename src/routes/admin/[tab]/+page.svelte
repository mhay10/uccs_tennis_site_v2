<script lang="ts">
  import type { ActionData, PageData } from "./$types";
  import AddTeams from "$lib/components/admin/AddTeams.svelte";
  import CreatePools from "$lib/components/admin/CreatePools.svelte";
  import ManagePools from "$lib/components/admin/ManagePools.svelte";
  import CreateBrackets from "$lib/components/admin/CreateBrackets.svelte";
  import ManageBrackets from "$lib/components/admin/ManageBrackets.svelte";
  import ManageSchedule from "$lib/components/admin/ManageSchedule.svelte";
  import { page } from "$app/stores";

  // Contains the current selected tab
  export let data: PageData;

  export let form: ActionData;

  $: if (form?.success) alert(form.message);

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
  <CreateBrackets brackets={data.brackets} teams={data.teams} />
{:else if data.tab === "manage-brackets"}
  <ManageBrackets brackets={data.brackets} />
{:else if data.tab === "manage-schedule"}
  <ManageSchedule />
{/if}
