<script lang="ts">
	import schedule from "$lib/uploads/schedule/schedule.png";
	import upcomingMatches from "$lib/uploads/schedule/upcomingMatches.png";
</script>

<div class="flex h-[500px] justify-evenly max-[640px]:h-[320px]">
	<div class="flex flex-col items-center">
		<img src={schedule} alt="Match schedule" class="mt-5 max-[640px]:w-4/5" />
	</div>
	<div class="flex flex-col items-center overflow-y-scroll">
		<img src={upcomingMatches} alt="List of upcoming matches" class="mt-5 max-[640px]:w-4/5" />
	</div>
</div>
