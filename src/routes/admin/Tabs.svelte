<script lang="ts">
  import { page } from "$app/stores";
</script>

<header class="header">
  <nav>
    <ul class="tabs">
      <li>
        <a href="#/addteams" class="tab {$page.url.hash === '#/addteams' ? 'active' : null}"
          >Add Teams</a
        >
      </li>
      <li>
        <a href="#/createpools" class="tab {$page.url.hash === '#/createpools' ? 'active' : null} "
          >Create Pools</a
        >
      </li>
      <li>
        <a href="#/managepools" class="tab {$page.url.hash === '#/managepools' ? 'active' : null}"
          >Manage Pools</a
        >
      </li>
      <li>
        <a
          href="#/createbrackets"
          class="tab {$page.url.hash === '#/createbrackets' ? 'active' : null}">Create Brackets</a
        >
      </li>
      <li>
        <a
          href="#/managebrackets"
          class="tab {$page.url.hash === '#/managebrackets' ? 'active' : null}">Manage Brackets</a
        >
      </li>
      <li>
        <a
          href="#/manageschedule"
          class="tab {$page.url.hash === '#/manageschedule' ? 'active' : null}">Manage Schedule</a
        >
      </li>
      <li>
        <form method="POST" action="?">
          <button type="submit" class="tab">Logout</button>
        </form>
      </li>
    </ul>
  </nav>
</header>

<style>
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    border: 1px solid var(--color-1);
    color: #000;
  }

  nav {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .tabs {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tab {
    display: inline-block;
    padding: 10px;
    text-decoration: none;
    color: var(--color-text);
  }

  .tab.active {
    background-color: var(--color-1);
  }
</style>
