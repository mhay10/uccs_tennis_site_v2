<script lang="ts">
	const urlPrefix = "http://localhost:3000/poolplay";

	let poolIndex = -1;
	$: listOfPools = Array.from({ length: 8 }, (_, i) => i);
</script>

<div class="flex flex-col items-center">
	<div class="w-4/5 max-[800px]:overflow-x-scroll">
		<div class="max-[800px]:w-[900px]">
			<img src="{urlPrefix}/pools.png" alt="Table of pools with teams" class="m-auto h-full" />
		</div>
	</div>

	<div class="mt-5">
		<h3 class="mb-2 text-lg font-bold">Select pool from list below</h3>
		<select bind:value={poolIndex}>
			<option value={-1}>-- Select Pool --</option>
			{#each listOfPools as _, i}
				<option value={i}>Pool {i + 1}</option>
			{/each}
		</select>

		{#if poolIndex !== -1}
			<img
				src="{urlPrefix}/pool{poolIndex + 1}.png"
				alt="Pool {poolIndex + 1}"
				class="ml-auto mr-auto mt-10 w-[500px] max-[640px]:w-full"
			/>
		{/if}
	</div>
</div>
