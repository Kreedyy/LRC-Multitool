export let shared = $state<{
	artist?: string;
	track?: string;
	album?: string;
	duration?: number;
	lyrics?: string;
}>({});

// Usage: setSharedTrackData({ artist: "Artist Name", track: "Track Name" });
export function setSharedTrackData({
	artist,
	track,
	album,
	duration,
	lyrics
}: {
	artist?: string;
	track?: string;
	album?: string;
	duration?: number;
	lyrics?: string;
} = {}) {
	artist && (shared.artist = artist);
	track && (shared.track = track);
	album && (shared.album = album);
	duration && (shared.duration = duration);
	lyrics && (shared.lyrics = lyrics);
}

// In case you rather assign an array for these
export function getSharedTrackData(
	...fields: ('artist' | 'track' | 'album' | 'duration' | 'lyrics')[]
) {
	if (fields.length === 0) {
		return {
			artist: shared.artist,
			track: shared.track,
			album: shared.album,
			duration: shared.duration,
			lyrics: shared.lyrics
		};
	}

	const result: any = {};
	fields.forEach((field) => {
		result[field] = shared[field];
	});
	return result;
}

export function getSharedArtist() {
	return shared.artist;
}

export function getSharedTrack() {
	return shared.track;
}

export function getSharedAlbum() {
	return shared.album;
}

export function getSharedDuration() {
	return shared.duration;
}

export function getSharedLyrics() {
	return shared.lyrics;
}
