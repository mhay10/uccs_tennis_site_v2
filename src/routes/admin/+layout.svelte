<script lang="ts">
  import { page } from "$app/stores";
  import adminHome from "$lib/images/admin-home.png";
</script>

{#if $page.url.pathname !== "/admin/login"}
  <script lang="ts">
    import { page } from "$app/stores";
    import adminHome from "$lib/images/admin-home.png";
  </script>

  <div class="tab-bar">
    <a href="/admin" class="admin-home"><img src={adminHome} alt="Admin Home" /></a>
    <header class="header">
      <nav>
        <ul class="tabs">
          <li>
            <a
              href="/admin/add-teams"
              class="tab {$page.url.pathname.endsWith('add-teams') ? 'active' : null}">Add Teams</a
            >
          </li>
          <li>
            <a
              href="/admin/create-pools"
              class="tab {$page.url.pathname.endsWith('create-pools') ? 'active' : null} "
              >Create Pools</a
            >
          </li>
          <li>
            <a
              href="/admin/manage-pools"
              class="tab {$page.url.pathname.endsWith('manage-pools') ? 'active' : null}"
              >Manage Pools</a
            >
          </li>
          <li>
            <a
              href="/admin/create-brackets"
              class="tab {$page.url.pathname.endsWith('create-brackets') ? 'active' : null}"
              >Create Brackets</a
            >
          </li>
          <li>
            <a
              href="/admin/manage-brackets"
              class="tab {$page.url.pathname.endsWith('manage-bracket') ? 'active' : null}"
              >Manage Brackets</a
            >
          </li>
          <li>
            <a
              href="/admin/manage-schedule"
              class="tab {$page.url.pathname.endsWith('manage-schedule') ? 'active' : null}"
              >Manage Schedule</a
            >
          </li>
          <li>
            <form method="POST" action="?/logout">
              <button type="submit" id="logout" class="tab">Logout</button>
            </form>
          </li>
        </ul>
      </nav>
    </header>
  </div>
  <br />
{/if}

<slot />

<style>
  .tab-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .admin-home {
    position: fixed;
    left: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-1);
    width: fit-content;
    padding: 7px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-1);
    color: #000;
    height: 100%;
    width: fit-content;
    margin: 0 auto;
  }

  nav {
    /* width: 85%; */
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

  #logout {
    border: none;
    border-left: 1px solid var(--color-1);
    background: none;
    cursor: pointer;
    font-size: 1rem;
    font-family: var(--font-body);
  }
</style>
