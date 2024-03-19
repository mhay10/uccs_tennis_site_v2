<script lang="ts">
	import { urlPrefix } from "$lib";

	async function preloadPool(poolNum: number) {
		const img = new Image();
		img.src = `${urlPrefix}/poolplay/pool${poolNum + 1}.png`;
		await img.decode();
	}
</script>

<div class="mb-[30vh] flex flex-col items-center">
	<div class="w-4/5 max-[800px]:overflow-x-scroll">
		<div class="max-[800px]:w-[900px]">
			<img
				src="{urlPrefix}/poolplay/pools.png"
				alt="Table of pools with teams"
				class="m-auto h-full"
			/>
		</div>
	</div>

	<div
		class="mt-5 flex h-32 h-[500px] grow flex-wrap items-center justify-evenly max-[1000px]:overflow-y-scroll max-[640px]:h-[45vh]"
	>
		{#each { length: 8 } as _, poolNum}
			{#await preloadPool(poolNum)}
				<p>Loading Pool {poolNum}</p>
			{:then}
				<img
					src="{urlPrefix}/poolplay/pool{poolNum + 1}.png"
					alt="Pool {poolNum + 1}"
					class="w-auto p-5"
					crossorigin="anonymous"
				/>
			{:catch}
				<img
					src="{urlPrefix}/poolplay/pool{poolNum + 1}.png"
					alt="Pool {poolNum + 1}"
					class="w-auto p-5"
					crossorigin="anonymous"
				/>
			{/await}
		{/each}
	</div>
</div>
