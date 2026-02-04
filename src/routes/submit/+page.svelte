<script lang="ts">
	import {
	getSharedDuration,
		getSharedLyrics,
		setSharedTrackData
	} from '$lib/assets/SharedData.svelte';
	import LyricBox from '$lib/assets/LyricBox.svelte';

	let artist = $state<string>();
	let track = $state<string>();
	let album = $state<string>();

	let lyrics = $state<string>();
	lyrics = getSharedLyrics();

	$effect(() => {
		setSharedTrackData({ artist: artist, track:track, album: album, lyrics: lyrics });
	});
</script>

<div class="base">
	<form>
		<div class="inputContainer">
			<input type="text" bind:value={artist} />
			<input type="text" bind:value={track} />
			<input type="text" bind:value={album} />
		</div>
		<p>test{getSharedDuration()}</p>
		<LyricBox {lyrics} />
	</form>
</div>

<style>
	:global(.lyricEditor){
		flex: 1;
	}
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
	}
	.base {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		padding: 2rem;
	}
</style>
