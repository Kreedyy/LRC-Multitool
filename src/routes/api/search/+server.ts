import { checkRateLimit } from '$lib/server/RateLimiter';
import { json, error } from '@sveltejs/kit';

export async function GET({ url, fetch, getClientAddress }) {
	const rateLimit = checkRateLimit(`search:${getClientAddress()}`, 30, 60 * 1000);
	if (!rateLimit.allowed) {
		throw error(429, 'Too many requests');
	}

	const q = url.searchParams.get('q');

	if (!q) {
		throw error(400, 'Missing search query');
	}

	if (q.length > 50) {
		throw error(400, 'Search query too long (max 50 characters)');
	}

	const apiUrl = new URL('https://lrclib.net/api/search');
	apiUrl.searchParams.set('q', q);

	const response = await fetch(apiUrl);

	if (!response.ok) {
		throw error(response.status, 'Search failed');
	}

	const data = await response.json();

	return json(data);
}
