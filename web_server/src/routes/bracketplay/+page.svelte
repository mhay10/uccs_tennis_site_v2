<script lang="ts">
	import { onMount } from "svelte";

	const urlPrefix = "http://localhost:3000/bracketplay";

	let bracketIndex = -1;
	const bracketNames = ["Gold Bracket", "Silver Bracket", "Bronze Bracket", "Copper Bracket"];
	let listOfBrackets: string[] = [];

	onMount(async () => {
		listOfBrackets = [];
		for (const bracket of bracketNames) {
			const res = await fetch(`${urlPrefix}/${getFilename(bracket)}`, { method: "HEAD" });
			if (res.ok) listOfBrackets = [...listOfBrackets, bracket];
		}
	});

	function getFilename(name: string) {
		const parts = name.split(" ");
		return parts[0].toLowerCase() + parts[1] + ".png";
	}
</script>

<div>
	<h3>Select bracket from list below</h3>
	<select bind:value={bracketIndex}>
		<option value={-1}>-- Select Bracket --</option>
		{#each listOfBrackets as name, i}
			<option value={i}>{name}</option>
		{/each}
	</select>

	{#if bracketIndex !== -1}
		<img
			src="{urlPrefix}/{getFilename(bracketNames[bracketIndex])}"
			alt={bracketNames[bracketIndex]}
		/>
	{/if}
</div>
