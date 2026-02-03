<script lang="ts">
	let {
		track = $bindable(),
		getSyncedLyrics = $bindable()
	}: { track: any; getSyncedLyrics: boolean } = $props<{}>();

	let lyrics = $state<string>();

	function setPlainOrSyncedLyrics(syncedLyrics: boolean) {
		lyrics = syncedLyrics ? track.syncedLyrics : track.plainLyrics;
	}
	$effect(() => {
		if (track) {
			setPlainOrSyncedLyrics(getSyncedLyrics);
		}
	});
	// Transform data here
</script>

<!--
.trackName string
.name string //Same as .trackName?
.albumName string
.artistName string
.duration number
.id number
.instrumental bool
.plainLyrics string
.syncedLyrics
-->
<textarea bind:value={lyrics}> </textarea>

<style>
	textarea {
		resize: none;
		overflow-y: scroll;
		border: 2px solid var(--brand-500);
		background: var(--neutral-450);
		width: 100%;
		max-width: 750px;
		height: 100%;
		color: var(--neutral-100);
		padding: 0.5rem;
	}
</style>
