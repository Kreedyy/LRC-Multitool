<script lang="ts">
	import { formatLyrics } from '$lib/assets/FormatLyrics';
	let {
		result = $bindable(),
		userPick = $bindable(),
		getSyncedLyrics = $bindable(),
		showResults = $bindable()
	}: {
		result: any;
		userPick: any;
		getSyncedLyrics: boolean;
		showResults: boolean;
	} = $props<{}>();

	let resultsContainer = $state<HTMLDivElement>();

	function setUserPick(getSynced: boolean, item: any) {
		showResults = false;
		item.plainLyrics = formatLyrics(item?.plainLyrics);
		item.syncedLyrics = formatLyrics(item?.syncedLyrics);
		userPick = item;
		getSyncedLyrics = getSynced;
	}

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins.toString().padStart(1, '0')}:${secs.toString().padStart(2, '0')}`;
	}
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

show buttons for importing plain and synced lyrics or mark as instrumental if instrumental
-->

<!--Hides results if clicking outside of results or search input-->
<svelte:document
	onclick={(e) => {
		if (
			resultsContainer &&
			!resultsContainer.contains(e.target as HTMLElement) &&
			!document.getElementById('searchInput')?.contains(e.target as HTMLElement)
		) {
			showResults = false;
		}
	}}
/>

{#if result && showResults}
	<div class="showResults" bind:this={resultsContainer}>
		{#each result as item}
			<div class="result">
				<p>{item.trackName}</p>
				<div class="lyricButtons">
					<p class="duration">
						{formatTime(item.duration)}
					</p>
					{#if item.plainLyrics || item.syncedLyrics}
						<!--Checks if lyrics exist, if json returns null/undefined these will be false-->
						{#if item.plainLyrics}
							<button class="plain" onclick={() => setUserPick(false, item)}>Plain</button>
						{/if}
						{#if item.syncedLyrics}
							<button class="synced" onclick={() => setUserPick(true, item)}>Synced</button>
						{/if}
					{:else}
						<span>Instrumental</span>
					{/if}
				</div>
				<div class="album">
					<p>{item.albumName} - {item.artistName}</p>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	span {
		display: flex;
		align-items: center;
		color: rgb(75 85 99);
		background-color: rgb(209 213 219);
	}
	.lyricButtons {
		display: flex;
		gap: 0.5rem;
	}
	.showResults {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow: scroll;
		position: absolute;
		top: 102px;

		backdrop-filter: blur(3px);
		padding: 1rem;
	}
	.result {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		background-color: var(--neutral-400);
		padding: 1rem;
		border: 2px solid var(--brand-500);
		border-radius: 0.25rem;
	}
	.album {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.duration {
		color: rgb(49 46 129);
		background-color: rgb(199 210 254);
		width: fit-content;
	}
	.plain {
		background-color: rgb(31 41 55); /*Match colors from LRCLIB*/
		color: rgb(229 231 235);
	}
	.synced {
		background-color: rgb(22 101 52); /*Match colors from LRCLIB*/
		color: rgb(187 247 208);
	}
	button {
		font-size: 1rem;
		color: var(--neutral-100);
		cursor: pointer;
		background: transparent;
		padding: 0;
		border: 0;
	}
	.plain,
	.synced,
	.duration,
	span {
		border-radius: 0.25rem;
		padding-top: 0.125rem;
		padding-bottom: 0.125rem;
		padding-left: 0.25rem;
		padding-right: 0.25rem;
	}
</style>
