import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	const mode = params; // [TODO]: db

	if (!mode) {
		return { status: 400 };
	}

	return {
		status: 200,
		body: mode
	};
};
