<script lang="ts">
	const urlPrefix = "http://localhost:3000/schedule";
</script>

<div class="flex h-[500px] justify-evenly max-[640px]:h-[320px]">
	<div class="flex flex-col items-center">
		<img src="{urlPrefix}/schedule.png" alt="Match schedule" class="mt-5 max-[640px]:w-4/5" />
	</div>
	<div class="flex flex-col items-center overflow-y-scroll">
		<img
			src="{urlPrefix}/upcomingMatches.png"
			alt="List of upcoming matches"
			class="mt-5 max-[640px]:w-4/5"
		/>
	</div>
</div>
