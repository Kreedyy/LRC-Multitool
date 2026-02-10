<script lang="ts">
	import { getSharedDuration } from "./SharedData.svelte";

	let { onlinksubmit, onclose }: { onlinksubmit: (url: string) => void; onclose: () => void } = $props();

	let linkUrl = $state<string>('');
	let isLoading = $state<boolean>(false);
	let errorMsg = $state<string>('');

	const youtubePattern = /^https?:\/\/(www\.|music\.|m\.)?youtu(be\.com\/(watch\?v=|shorts\/)|\.be\/).+/;
	const soundcloudPattern = /^https?:\/\/(www\.|m\.|on\.)?soundcloud\.com\/.+/;
	const directAudioPattern = /^https?:\/\/.+\.(mp3|wav|ogg|m4a|flac|aac|opus|webm)(\?.*)?$/i;

	async function validateLink(url: string): Promise<boolean> {
		if (youtubePattern.test(url)) {
			return await validateYoutubeUrl(url);
		}
		if (soundcloudPattern.test(url)) {
			return await validateSoundcloudUrl(url);
		}
		if (directAudioPattern.test(url)) {
			return await validateAudioUrl(url);
		}
		return false;
	}

	async function validateYoutubeUrl(url: string): Promise<boolean> {
		// Placeholder for YouTube URL validation logic
		return true;
	}

	async function validateSoundcloudUrl(url: string): Promise<boolean> {
		// Placeholder for SoundCloud URL validation logic
		return true;
	}

	async function validateAudioUrl(url: string): Promise<boolean> {
		try {
			const duration = await getAudioDuration(url);
			return duration > 0;
		} catch {
			return false;
		}
	}

	function getAudioDuration(url: string): Promise<number> {
		return new Promise((resolve, reject) => {
			const audio = new Audio();
			audio.src = url;
			audio.addEventListener('loadedmetadata', () => {
				resolve(audio.duration);
			});
			audio.addEventListener('error', (e) => {
				reject(e);
			});
		});
	}

	async function handleSubmit(): Promise<void> {
		if (!linkUrl.trim()) return;

		isLoading = true;
		errorMsg = '';
		try {
			const isValid = await validateLink(linkUrl);
			if (isValid) {
				onlinksubmit(linkUrl.trim());
				onclose();
			} else {
				errorMsg = 'Invalid audio URL. Please provide a valid link.';
			}
		} catch {
			errorMsg = 'Failed to load audio. Check the URL and try again.';
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="link-upload">
	<div class="input-group">
		<label for="linkInput">Paste audio URL</label>
		<input
			id="linkInput"
			type="text"
			placeholder="https://youtube.com/watch?v=..."
			bind:value={linkUrl}
			onkeydown={(e) => e.key === 'Enter' && handleSubmit()}
		/>
	</div>
	<button class="submit-btn" onclick={handleSubmit} disabled={!linkUrl.trim() || isLoading}>
		{#if isLoading}
			<span class="spinner"></span>
			Loading...
		{:else}
			Load Audio
		{/if}
	</button>
	{#if errorMsg}
		<p class="error-msg">{errorMsg}</p>
	{:else}
		<p class="hint">Supports YouTube, SoundCloud, and direct audio URLs</p>
	{/if}
</div>

<style>
	.link-upload {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 164px;
		justify-content: center;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	label {
		font-size: 0.8125rem;
		color: var(--neutral-200);
	}

	input {
		padding: 0.625rem 0.75rem;
		background: var(--neutral-450);
		border: 2px solid var(--neutral-400);
		border-radius: var(--radius-sm);
		color: var(--neutral-100);
		font-size: 0.9375rem;
		outline: none;
		transition: all var(--transition);
	}

	input:focus {
		border-color: var(--brand-500);
		background: var(--neutral-400);
	}

	input::placeholder {
		color: var(--neutral-200);
		opacity: 0.6;
	}

	.submit-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.625rem 1rem;
		background: var(--brand-500);
		border: none;
		border-radius: var(--radius-sm);
		color: var(--neutral-700);
		font-size: 0.9375rem;
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition);
	}

	.submit-btn:hover:not(:disabled) {
		background: var(--brand-400);
	}

	.submit-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.error-msg {
		font-size: 0.75rem;
		color: var(--error);
		text-align: center;
		margin: 0;
	}

	.hint {
		font-size: 0.75rem;
		color: var(--neutral-200);
		text-align: center;
		margin: 0;
	}

	.spinner {
		width: 14px;
		height: 14px;
		border: 2px solid var(--neutral-700);
		border-top-color: transparent;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
