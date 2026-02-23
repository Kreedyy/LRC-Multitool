import { checkRateLimit } from '$lib/server/RateLimiter';
import { json, error } from '@sveltejs/kit';

export async function POST({ fetch, getClientAddress }) {
	const rateLimit = checkRateLimit(`challenge:${getClientAddress()}`, 10, 60 * 1000);
	if (!rateLimit.allowed) {
		throw error(429, 'Too many requests');
	}

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
		throw error(500, 'An unexpected error occurred');
	}
}
