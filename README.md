# LRC Multitool

Web-based tool for creating, editing and syncing lyrics with integrated audio playback and controls. Search by artist/track/album to import lyrics directly from [LRCLIB](https://lrclib.net/), optionally submit synced or unsynced lyrics via their API.

## Features

- [x] Lyrics editing, syncing & automatic formatting
- [x] Functionality with [LRCLIB](https://lrclib.net/)'s API (Searching & Submitting Lyrics)
- [x] Upload audio via local files, direct link, YouTube link or SoundCloud link to use while syncing
- [ ] Word-by-word lyrics syncing similar to LRCGET >=v.2.0.0 through their [Lyricsfile](https://github.com/tranxuanthang/lrclib/issues/8#issuecomment-4291600384) extension (YAML format) / Enhanced LRC

## Prerequisites

- [Bun](https://bun.com/get)

## Installation

Install dependencies

```sh
bun install
```

# Formatting & Linting

```sh
bun run format
```

```sh
bun run lint
```

# Development

```sh
bun run dev
```

# Building

```sh
bun run build
```
