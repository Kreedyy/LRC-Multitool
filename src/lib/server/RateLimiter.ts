type RateLimitEntry = {
	count: number;
	resetTime: number;
};

const rateLimitMap = new Map<string, RateLimitEntry>();

setInterval(() => {
	const now = Date.now();
	for (const [key, entry] of rateLimitMap.entries()) {
		if (now > entry.resetTime) {
			rateLimitMap.delete(key);
		}
	}
}, 60000);

export function checkRateLimit(
	identifier: string,
	maxRequests: number,
	windowMs: number
): { allowed: boolean; retryAfter?: number } {
	const now = Date.now();
	const entry = rateLimitMap.get(identifier);

	if (!entry || now > entry.resetTime) {
		rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
		return { allowed: true };
	}

	if (entry.count < maxRequests) {
		entry.count++;
		return { allowed: true };
	}

	return { allowed: false, retryAfter: Math.ceil((entry.resetTime - now) / 1000) };
}
