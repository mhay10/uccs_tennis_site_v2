<script lang="ts">
	import { Footer, FooterLink, FooterLinkGroup } from "flowbite-svelte";
	import { CibInstagram, CibGithub, CibGmail } from "svelte-coreui-icons";
</script>

<Footer class="absolute bottom-0 start-0 z-20 w-full bg-gray-800 py-5 text-white">
	<FooterLinkGroup ulClass="flex flex-wrap justify-center items-center mt-3 text-sm sm:mt-0">
		<FooterLink
			href="https://giving.cu.edu/fund/uccs-club-tennis-support-fund"
			target="_blank"
			class="mx-2"
		>
			<b>Donate</b>
		</FooterLink>
		<FooterLink href="https://www.instagram.com/uccsclubtennis/" target="_blank" class="mx-2">
			<CibInstagram class="mr-1 inline-block h-6 w-6" />
		</FooterLink>
		<FooterLink
			href="https://github.com/mhay10/uccs_tennis_site_v2"
			target="_blank"
			class="mx-2 hover:text-gray-300"
		>
			<CibGithub class="mr-1 inline-block h-6 w-6" />
		</FooterLink>
		<FooterLink
			href="mailto:uccstennisclub@gmail.com"
			target="_blank"
			class="mx-2 hover:text-gray-300"
		>
			<CibGmail class="mr-1 inline-block h-6 w-6" />
		</FooterLink>
	</FooterLinkGroup>
</Footer>
