// Server endpoint that acts as a proxy for LRCLIB publish requests
// The client solves the challenge, then sends the token to this endpoint
// This endpoint forwards the request to LRCLIB with the proper headers

import { convertSyncedToPlainLyrics, validatePayload } from '$lib/assets/FormatLyrics.js';
import { json, type RequestHandler, error } from '@sveltejs/kit';

export async function GET({ url, fetch }) {
	const q = url.searchParams.get('q'); // 'q' searches track, artist and album from given input

	const response = await fetch(`https://lrclib.net/api/search?q=${q}`);
	const data = await response.json();

	return json(data);
}

// Proxy endpoint for challenge requests (avoids CORS)
export async function PUT({ fetch }) {
	try {
		const challengeResponse = await fetch('https://lrclib.net/api/request-challenge', {
			method: 'POST'
		});

		if (!challengeResponse.ok) {
			throw error(challengeResponse.status, 'Failed to get challenge');
		}

		const challengeData = await challengeResponse.json();
		return json(challengeData);
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		throw error(500, 'Server error: ' + (err as Error).message);
	}
}

// Proxy endpoint for publishing with client-solved challenge
export const POST: RequestHandler = async ({ request, fetch }) => {
	try {
		const body = await request.json();
		const { publishToken, ...lyricData } = body;

		if (!publishToken) {
			throw error(400, 'Publish token is required');
		}

		const payload = {
			trackName: lyricData.track,
			artistName: lyricData.artist,
			albumName: lyricData.album,
			duration: Number(lyricData.duration),
			plainLyrics: convertSyncedToPlainLyrics(lyricData.lyrics),
			syncedLyrics: lyricData.lyrics
		};

		const validation = validatePayload(payload);
		if (!validation.valid) {
			throw error(400, validation.errors.join(', '));
		}

		const publishResponse = await fetch('https://lrclib.net/api/publish', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Publish-Token': publishToken
			},
			body: JSON.stringify(payload)
		});

		// 201 Created = success (empty body per LRCLIB docs)
		if (publishResponse.status === 201) {
			return json({ success: true });
		}

		const responseText = await publishResponse.text();
		let errorMessage = `Publish failed with status ${publishResponse.status}`;

		if (responseText) {
			try {
				const errorData = JSON.parse(responseText);
				errorMessage = errorData.message || errorData.name || errorMessage;
			} catch {
				// In case JSON parse fails somehow
				errorMessage = responseText;
			}
		}

		throw error(publishResponse.status, errorMessage);
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		throw error(500, 'Server error: ' + (err as Error).message);
	}
};
