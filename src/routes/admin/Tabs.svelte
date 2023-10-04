<script lang="ts">
  import { page } from "$app/stores";

  let selected = 0;
</script>

<header>
  <nav>
    <ul>
      <li>
        <a href="/addteams" class="tab {$page.url.pathname.includes('/addteams')}">Add Teams</a>
      </li>
      <li>
        <a href="#/createpools" class="tab {$page.url.pathname.includes('/createpools')}"
          >Create Pools</a
        >
      </li>
      <li>
        <a href="/admin/managepools" class="tab {$page.url.pathname.includes('/managepools')}"
          >Manage Pools</a
        >
      </li>
      <li>
        <a href="/createbrackets" class="tab {$page.url.pathname.includes('/createbrackets')}"
          >Create Brackets</a
        >
      </li>
      <li>
        <a href="/managebrackets" class="tab {$page.url.pathname.includes('/managebrackets')}"
          >Manage Brackets</a
        >
      </li>
      <li>
        <a href="/manageschedule" class="tab {$page.url.pathname.includes('/manageschedule')}"
          >Manage Schedule</a
        >
      </li>
      <li><a href="/logout" class="tab {$page.url.pathname.includes('/logout')}">Logout</a></li>
    </ul>
  </nav>
</header>
