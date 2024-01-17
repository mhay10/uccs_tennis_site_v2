<script lang="ts">
	import pool1 from "$lib/uploads/poolplay/pool1.png";
	import pool2 from "$lib/uploads/poolplay/pool2.png";
	import pool3 from "$lib/uploads/poolplay/pool3.png";
	import pool4 from "$lib/uploads/poolplay/pool4.png";
	import pool5 from "$lib/uploads/poolplay/pool5.png";
	import pool6 from "$lib/uploads/poolplay/pool6.png";
	import pool7 from "$lib/uploads/poolplay/pool7.png";
	import pool8 from "$lib/uploads/poolplay/pool8.png";
	import pools from "$lib/uploads/poolplay/pools.png";

	let poolIndex = -1;
	const listOfPools = [pool1, pool2, pool3, pool4, pool5, pool6, pool7, pool8];
</script>

<div class="flex flex-col items-center">
	<div class="w-4/5 max-[800px]:overflow-x-scroll">
		<div class="max-[800px]:w-[900px]">
			<img src={pools} alt="Table of pools with teams" class="m-auto h-full" />
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
				src={listOfPools[poolIndex]}
				alt="Pool {poolIndex + 1}"
				class="ml-auto mr-auto mt-10 w-[500px] max-[640px]:w-full"
			/>
		{/if}
	</div>
</div>
