import type { RequestHandler } from '@sveltejs/kit';
import { serialize } from 'cookie';

export const get: RequestHandler = async () => {
	return {
		status: 303,
		headers: {
			'Set-Cookie': serialize('session', '', {
				path: '/',
				// the cookie should expire immediately
				expires: new Date(0)
			}),
			location: '/apps'
		}
	};
};
