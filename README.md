# LRC Creator

Web alternative to [LRCGET](https://github.com/tranxuanthang/lrcget), inspired by [https://github.com/magic-akari/lrc-maker](https://github.com/magic-akari/lrc-maker).

## Features
- Lyric editing and syncing
- Functionality with [LRCLIB](https://lrclib.net/) API (Importing & submitting lyrics)
- Upload audio via local files, link, YouTube link or SoundCloud link

## TODO

1. Lyric editing
2. Functionality with [LRCLIB](https://lrclib.net/) API (GET /api/search param 'q' & POST)
3. Only POST lyrics if fully plain or fully synced (checking if every line starts with valid [mm:ss.xx], if synced POST both plain & synced by removing timestamps)
4. Uploading files via YouTube and SoundCloud, setSharedTrackData with the file's metadata
5. Add User-Agent header according to LRCLIB docs

## Prerequisites

- [Bun](https://bun.com/)

## Installation

Install dependencies

```sh
bun install
```

# Formatting

```sh
bun run format
```

# Development

```sh
bun run dev
```

# Building

```sh
bun run build
```
