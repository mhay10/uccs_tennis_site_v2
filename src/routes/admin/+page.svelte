<script lang="ts">
  import AddTeams from "$lib/components/admin/AddTeams.svelte";
  import CreatePools from "$lib/components/admin/CreatePools.svelte";
  import ManagePools from "$lib/components/admin/ManagePools.svelte";
  import CreateBrackets from "$lib/components/admin/CreateBrackets.svelte";
  import ManageBrackets from "$lib/components/admin/ManageBrackets.svelte";
  import ManageSchedule from "$lib/components/admin/ManageSchedule.svelte";
  import Router from "svelte-spa-router";

  const routes = {
    "/addteams": AddTeams,
    "/createpools": CreatePools,
    "/managepools": ManagePools,
    "/createbrackets": CreateBrackets,
    "/managebrackets": ManageBrackets,
    "/manageschedule": ManageSchedule
  };
</script>

<Router {routes} />
