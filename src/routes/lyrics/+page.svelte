<script lang="ts">
	import LyricBox from '$lib/assets/LyricBox.svelte';
	import LyricSearch from '$lib/assets/LyricSearch.svelte';
	import ShowResults from '$lib/assets/ShowResults.svelte';

	let data = $state<any>();
	let track = $state<any>();
</script>

<div>
	<LyricSearch bind:result={data} />
	<!--Fetch results and assign to data-->
	<ShowResults bind:userPick={track} {data} />
	<!--Showcase of results from data and handles user pick-->
	<LyricBox {track} />
	<!--Processes user pick by filling textarea with lyrics-->
</div>

<style>
	div {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2rem;
	}
</style>
