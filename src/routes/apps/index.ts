import type { RequestHandler } from '@sveltejs/kit';

import { serialize } from 'cookie';

import { prisma } from '$root/lib/database';

export const post: RequestHandler = async ({ request }) => {
	const form = await request.formData();
	const emergencyMobile = form.get('mobile') as string;

	if (!emergencyMobile) {
		return {
			status: 400,
			body: {
				error: 'Emergency mobile is required'
			}
		};
	}

	if (typeof emergencyMobile !== 'string' && !Number.isInteger(Number(emergencyMobile))) {
		return {
			status: 400,
			body: {
				error: 'Enter a valid emergency mobile'
			}
		};
	}

	let user = await prisma.user.findUnique({
		where: { emergencyMobile }
	});

	if (!user) {
		await prisma.user.create({
			data: {
				emergencyMobile
			}
		});

		user = await prisma.user.findUnique({
			where: { emergencyMobile }
		});
	}

	return {
		status: 200,
		body: {
			// for updating the session on the client
			user,
			success: 'Success'
		},
		headers: {
			'Set-Cookie': serialize('session', user!.id, {
				// send cookie for every page
				path: '/',
				// server side only cookie so you can't use `document.cookie`
				httpOnly: true,
				// only requests from same site can send cookies
				// and serves to protect from CSRF
				// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
				sameSite: 'strict',
				// only sent over HTTPS
				secure: process.env.NODE_ENV === 'production',
				// set cookie to expire after a month
				maxAge: 60 * 60 * 24 * 30
			})
		}
	};
};
