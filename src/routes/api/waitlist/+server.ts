// Accessible to anyone

import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.formData();
	const email = data.get('email') as string;

	console.log(email + ' showed interest');

	return json({ message: 'Thanks for showing interest!' });
};
