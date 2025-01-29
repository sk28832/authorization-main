import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	cookies.delete('authId', { path: '/' });
	redirect(302, '/signin');
};
