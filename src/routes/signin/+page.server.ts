// Accessible to only signed OUT users
// On sign in, they should be auto redirected to a page they have access to

import { prisma } from '$lib/server';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		const auth = await prisma.auth.findUnique({ where: { email, password } });
		if (!auth) return { failed: true };

		cookies.set('authId', auth!.id, { path: '/' });

		return { success: true };
	}
};
