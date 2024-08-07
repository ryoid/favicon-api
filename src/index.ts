const FALLBACK_FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m18 17-2-1h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2 8 8 0 0 1 3 12m-7 3a8 8 0 0 1-7-10l5 5v1a2 2 0 0 0 2 2m1-16A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2"/></svg>`;

const CACHE_CONTROL = 'public, max-age=86400, s-maxage=86400';

function defaultFavicon() {
	return new Response(FALLBACK_FAVICON, {
		status: 200,
		headers: {
			'Content-Type': 'image/svg+xml',
			'Cache-Control': CACHE_CONTROL,
			'x-favicon-fallback': '1',
		},
	});
}

async function fallback(url?: string | null) {
	try {
		if (!url) {
			return defaultFavicon();
		}

		// Fetch the favicon content
		let res = await fetch(url);
		if (!res.ok) {
			return defaultFavicon();
		}

		// Modify response
		res = new Response(res.body, res);
		if (!res.headers.has('Cache-Control')) {
			res.headers.set('Cache-Control', CACHE_CONTROL);
		}
		res.headers.set('content-location', url);
		res.headers.set('x-favicon-fallback', '1');
		return res;
	} catch (e) {
		return defaultFavicon();
	}
}

const SIZE = 128;

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const reqUrl = new URL(request.url);
		let url = reqUrl.searchParams.get('url');
		let fallbackUrl = reqUrl.searchParams.get('fallback');
		if (!url || url === '') {
			return fallback(fallbackUrl);
		}
		if (!/^https?:\/\//i.test(url)) {
			url = `http://${url}`;
		}

		// Query Google's favicon service for the favicon URL
		const faviconUrl = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=${SIZE}`;

		try {
			const head = await fetch(faviconUrl, {
				method: 'HEAD',
			});
			const contentUrl = head.headers.get('content-location');
			if (!contentUrl) {
				return fallback(fallbackUrl);
			}

			// Fetch the favicon content
			let res = await fetch(contentUrl);
			if (!res.ok) {
				return fallback(fallbackUrl);
			}

			// Modify response
			res = new Response(res.body, res);
			if (!res.headers.has('Cache-Control')) {
				res.headers.set('Cache-Control', CACHE_CONTROL);
			}
			res.headers.set('content-location', contentUrl);

			return res;
		} catch (e) {
			return fallback(fallbackUrl);
		}
	},
};
