export let shared = $state<{
	artist?: string;
	track?: string;
	album?: string;
	duration?: number;
	lyrics?: string;
}>({});

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
  fields.forEach(field => {
    result[field] = shared[field];
  });
  return result;
}

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
  artist && setSharedArtist(artist);
  track && setSharedTrack(track);
  album && setSharedAlbum(album);
  duration && setSharedDuration(duration);
  lyrics && setSharedLyrics(lyrics);
}

export function setSharedArtist(artist: string){
	shared.artist = artist;
}

export function setSharedTrack(track: string) {
	shared.track = track;
}

export function setSharedAlbum(album: string) {
	shared.album = album;
}

export function setSharedDuration(duration: number) {
	shared.duration = duration;
}

export function setSharedLyrics(lyrics: string) {
	shared.lyrics = lyrics;
}
