import type { Handle } from '@sveltejs/kit';
import { prisma } from '$lib/server';

// https://kit.svelte.dev/docs/hooks

export const handle: Handle = async ({ event, resolve }) => {
	// event.route.id will likely be useful

	const authId = event.cookies.get('authId');
	if (authId) {
		const auth = await prisma.auth.findUnique({ where: { id: authId } });
		if (auth) event.locals.auth = auth;
	}

	return resolve(event);
};
