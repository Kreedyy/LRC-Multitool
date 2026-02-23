export interface LrcLibTrack {
	id: number;
	trackName: string;
	artistName: string;
	albumName: string;
	duration: number;
	plainLyrics: string | null;
	syncedLyrics: string | null;
}

type SharedState = {
	artist: string;
	track: string;
	album: string;
	duration: number;
	lyrics: string;
	currentTime: number;
	seekRequest: { play: boolean; time: number } | null;
	searchResultData?: LrcLibTrack[];
};

export let shared = $state<SharedState>({
	artist: '',
	track: '',
	album: '',
	duration: 0,
	lyrics: '',
	currentTime: 0,
	seekRequest: null
});

// Usage: setSharedTrackData({ artist: "Artist Name", track: "Track Name" });
export function setSharedTrackData({
	artist,
	track,
	album,
	duration,
	lyrics,
	currentTime
}: {
	artist?: string;
	track?: string;
	album?: string;
	duration?: number;
	lyrics?: string;
	currentTime?: number;
} = {}) {
	artist && (shared.artist = artist);
	track && (shared.track = track);
	album && (shared.album = album);
	duration && (shared.duration = duration);
	currentTime && (shared.currentTime = currentTime);
	lyrics && (shared.lyrics = lyrics);
}

export function getSharedSearchResults(): LrcLibTrack[] | undefined {
	return shared.searchResultData;
}

export function getSharedArtist(): string {
	return shared.artist;
}
export function getSharedTrack(): string {
	return shared.track;
}
export function getSharedAlbum(): string {
	return shared.album;
}
export function getSharedDuration(): number {
	return shared.duration;
}
export function getSharedLyrics(): string {
	return shared.lyrics;
}
export function getSharedCurrentTime(): number {
	return shared.currentTime;
}

export function requestSeek(time: number, play: boolean = false): void {
	shared.seekRequest = { time, play };
}
