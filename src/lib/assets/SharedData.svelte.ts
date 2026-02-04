export let shared = $state<{
	artist?: string;
	track?: string;
	album?: string;
	duration?: number;
	lyrics?: string;
}>({});

export function setTrackData({
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
  artist && setArtist(artist);
  track && setTrack(track);
  album && setAlbum(album);
  duration && setDuration(duration);
  lyrics && setLyrics(lyrics);
}

export function setArtist(artist: string){
	shared.artist = artist;
}

export function setTrack(track: string) {
	shared.track = track;
}

export function setAlbum(album: string) {
	shared.album = album;
}

export function setDuration(duration: number) {
	shared.duration = duration;
}

export function setLyrics(lyrics: string) {
	shared.lyrics = lyrics;
}
