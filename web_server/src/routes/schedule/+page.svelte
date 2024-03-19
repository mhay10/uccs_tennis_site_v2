<script lang="ts">
	import { urlPrefix } from "$lib";
</script>

<div class="flex h-[500px] justify-evenly max-[640px]:h-[320px]">
	<div class="flex flex-col items-center">
		<img
			src="{urlPrefix}/schedule/schedule.png"
			alt="Match schedule"
			class="mt-5 max-[640px]:w-4/5"
			crossorigin="anonymous"
		/>
	</div>
	<div class="flex flex-col items-center overflow-y-scroll">
		<img
			src="{urlPrefix}/schedule/upcomingMatches.png"
			alt="List of upcoming matches"
			class="mt-5 max-[640px]:w-4/5"
			crossorigin="anonymous"
		/>
	</div>
</div>
