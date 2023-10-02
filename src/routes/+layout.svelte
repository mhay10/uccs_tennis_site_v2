<script lang="ts">
  import Footer from "./Footer.svelte";
  import Header from "./Header.svelte";
  import "./styles.css";
</script>

<Header />
<main class="main">
  <slot />
</main>
<Footer />
