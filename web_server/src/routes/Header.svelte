<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";
	import uccsMountaionLion from "$lib/images/uccs-mountain-lion.png";
	import { page } from "$app/stores";

	let activeUrl = "";
	$: activeUrl = $page.url.pathname;
</script>

<Navbar class="sticky top-0 bg-gray-800 text-white" fluid={true}>
	<NavBrand href="/">
		<div class="rounded-full bg-white">
			<img
				src={uccsMountaionLion}
				alt="UCCS Mountain Lion"
				width="50"
				class="translate-y-0.5 scale-75"
			/>
		</div>
		<span class="ml-5 self-center whitespace-nowrap text-xl font-semibold">UCCS Club Tennis</span>
	</NavBrand>
	<NavHamburger class="bg-gray-600" menuClass="bg-gray-600" />
	<NavUl
		{activeUrl}
		activeClass="font-bold underline italic text-white"
		nonActiveClass="text-slate-300"
		ulClass="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium bg-gray-800"
	>
		<NavLi href="/">Home</NavLi>
		<NavLi href="/schedule">Schedule</NavLi>
		<NavLi href="/poolplay">Pool Play</NavLi>
		<NavLi href="/bracketplay">Bracket Play</NavLi>
	</NavUl>
</Navbar>
