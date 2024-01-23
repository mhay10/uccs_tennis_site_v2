<script lang="ts">
	import { urlPrefix } from "$lib";

	let poolIndex = -1;
	$: listOfPools = Array.from({ length: 8 }, (_, i) => i);
</script>

<div class="flex flex-col items-center">
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
		class="mt-5 flex h-32 h-[500px] grow flex-wrap items-center justify-evenly max-[640px]:overflow-y-scroll max-[640px]:h-[45vh]"
	>
		{#each { length: 8 } as _, i}
			<img src="{urlPrefix}/poolplay/pool{i + 1}.png" alt="Pool {i + 1}" class="p-5" />
		{/each}
	</div>
</div>
