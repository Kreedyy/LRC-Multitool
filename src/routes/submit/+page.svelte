<script lang="ts">
	import { globalLyrics } from '$lib/assets/GlobalLyrics.svelte';
	import LyricBox from '$lib/assets/LyricBox.svelte';

	let lyrics = $state<string>();
	lyrics = globalLyrics.lyrics;

	$effect(() => {
		globalLyrics.lyrics = lyrics;
	});
</script>

<div>
	<LyricBox {lyrics} />
</div>

<style>
	div {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		padding: 2rem;
		position: relative;
	}
</style>
