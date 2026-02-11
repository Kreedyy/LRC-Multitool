<script lang="ts">
	import LyricBox from '$lib/assets/LyricBox.svelte';
	import LyricSearch from '$lib/assets/LyricSearch.svelte';
	import ShowResults from '$lib/assets/ShowResults.svelte';
	import { getSharedLyrics } from '$lib/assets/SharedData.svelte';

	let result = $state<any>();
	let userPick = $state<any>();
	let getSyncedLyrics = $state<boolean>(true);
	let showResults = $state<boolean>(false);
	let lyrics = $state<string>();
	lyrics = getSharedLyrics();
</script>

<div>
	<!--Fetch results and assign to data-->
	<LyricSearch bind:result bind:showResults />
	<!--Showcase of results from data and handles user pick-->
	<ShowResults bind:userPick bind:getSyncedLyrics bind:result bind:showResults />
	<!--Processes user pick by filling textarea with lyrics-->
	<LyricBox bind:userPick bind:getSyncedLyrics bind:lyrics />
	<a href="/submit">Submitting to LRCLIB</a>
</div>

<style>
	a {
		font-size: 1.25rem;
	}
	div {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		padding: 2rem;
	}
	:global(.lyricEditor) {
		flex: 1;
	}
	:global(.showResults) {
		z-index: 2;
		width: calc(100% - 6rem);
		max-width: calc(750px - 1rem + 4px);
		height: calc(100% - 13rem);
	}
	@media only screen and (max-width: 600px) {
		div {
			padding-left: 1rem;
			padding-right: 1rem;
		}
		:global(.showResults) {
			width: calc(100% - 4rem);
		}
	}
</style>
