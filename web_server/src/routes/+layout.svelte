<script lang="ts">
	import "../app.pcss";
	import Header from "./Header.svelte";
	import Footer from "./Footer.svelte";
</script>

<Header />

<main class="mb-5 mt-5 text-center">
	<slot />
</main>

<Footer />
