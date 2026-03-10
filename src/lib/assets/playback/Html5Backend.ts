import type { PlaybackBackend, BackendCallbacks } from './Types';

export function createHtml5Backend(callbacks: BackendCallbacks): PlaybackBackend {
	const audio = new Audio();

	const onPlay = () => callbacks.onPlay();
	const onPause = () => callbacks.onPause();
	const onEnded = () => callbacks.onEnded();
	const onError = () => callbacks.onError('Failed to load audio file');

	audio.addEventListener('play', onPlay);
	audio.addEventListener('pause', onPause);
	audio.addEventListener('ended', onEnded);
	audio.addEventListener('error', onError);

	return {
		type: 'html5',
		supportsPlaybackRate: true,

		load(source: string): Promise<void> {
			return new Promise((resolve, reject) => {
				const onLoaded = () => {
					audio.removeEventListener('loadedmetadata', onLoaded);
					audio.removeEventListener('error', onError);
					callbacks.onDurationChange(audio.duration);
					resolve();
				};
				const onError = () => {
					audio.removeEventListener('loadedmetadata', onLoaded);
					audio.removeEventListener('error', onError);
					reject(new Error('Failed to load audio'));
				};
				audio.addEventListener('loadedmetadata', onLoaded);
				audio.addEventListener('error', onError);
				audio.src = source;
			});
		},

		play() {
			void audio.play();
		},

		pause() {
			audio.pause();
		},

		seekTo(seconds: number) {
			audio.currentTime = seconds;
		},

		getCurrentTime(): number {
			return audio.currentTime;
		},

		getDuration(): number {
			return audio.duration || 0;
		},

		setVolume(volume: number) {
			audio.volume = volume;
		},

		setPlaybackRate(rate: number): number {
			audio.playbackRate = rate;
			return rate;
		},

		destroy() {
			audio.pause();
			audio.removeEventListener('play', onPlay);
			audio.removeEventListener('pause', onPause);
			audio.removeEventListener('ended', onEnded);
			audio.removeEventListener('error', onError);
			audio.removeAttribute('src');
			audio.load();
		}
	};
}
