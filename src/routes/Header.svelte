<script lang="ts">
  import { page } from "$app/stores";
  import uccsLogo from "$lib/images/uccs-logo.png";

  // Toggles the navigation menu
  let show = false;
  function toggleMenu() {
    show = !show;
  }

  // Close navigation menu when clicked outside
  function handleClick(e: any) {
    if (!show || e.target.closest("header")) return;
    show = false;
  }
</script>

<svelte:window on:click={handleClick} />

<header class="header">
  <a href="/" class="logo">
    <img src={uccsLogo} alt="UCCS Logo" />
  </a>
  <!-- Hamburger menu button -->
  <button class="hamburger" on:click={toggleMenu}>&#9776;</button>
  <!-- Navigation links container -->
  <nav class="links" class:show>
    <a href="/schedule" class="link {$page.url.pathname.includes('/schedule') ? 'selected' : null}"
      >Schedule</a
    >
    <a href="/poolplay" class="link {$page.url.pathname.includes('/poolplay') ? 'selected' : null}"
      >Pool Play</a
    >
    <a
      href="/bracketplay"
      class="link {$page.url.pathname.includes('/bracketplay') ? 'selected' : null}">Bracket Play</a
    >
    <a href="/admin" class="link {$page.url.pathname.includes('/admin') ? 'selected' : null}"
      >Admin</a
    >
  </nav>
</header>
<br />

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    font-style: bold;
  }

  .logo img {
    width: auto;
    height: 25px;
  }

  .hamburger {
    display: none; /* Initially hide the hamburger button */
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }

  .links {
    display: flex;
    list-style: none;
    padding: 0;
  }

  .link {
    text-decoration: none;
    color: #000;
    padding: 0.5rem 1rem;
    font-size: 16px;
  }

  .link.selected {
    background-color: var(--color-1);
  }

  /* Media query to show/hide the navigation links */
  @media screen and (max-width: 550px) {
    .hamburger {
      display: block; /* Show the hamburger button */
    }

    .links {
      display: none; /* Initially hide the navigation links */
      flex-direction: column;
      position: absolute;
      width: 95%;
      top: 50px;
      background-color: #fff;
      border: 1px solid var(--color-1);
    }

    .links.show {
      display: flex; /* Show the navigation links when the class 'show' is applied */
    }

    .link {
      padding: 0.5rem 1rem;
      border-bottom: 1px solid #ccc;
    }
  }
</style>
