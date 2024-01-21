<script lang="ts">
	import { onMount } from "svelte";

	const urlPrefix = "https://1e53-146-70-174-179.ngrok-free.app/bracketplay";

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

<div class="flex flex-col items-center">
	<h3 class="mb-2 text-lg font-bold">Select bracket from list below</h3>
	<select bind:value={bracketIndex}>
		<option value={-1}>-- Select Bracket --</option>
		{#each listOfBrackets as name, i}
			<option value={i}>{name}</option>
		{/each}
	</select>

	{#if bracketIndex !== -1}
		<div class="w-4/5 max-[800px]:overflow-x-scroll mt-10">
			<div class="max-[800px]:w-[900px]">
				<img
					src="{urlPrefix}/{getFilename(bracketNames[bracketIndex])}"
					alt={bracketNames[bracketIndex]}
					class="m-auto h-full"
				/>
			</div>
		</div>
	{/if}
</div>
