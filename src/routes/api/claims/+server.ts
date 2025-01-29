/*

Implement an api endpoint that can return an employee's claims or an entire company's claims.

You can create multiple endpoints like `/api/claims/:employeeId` or something similar. Don't feel you have to shove everything into just `/api/claims`

Just make sure the data returned is for the right role. 

*/

import type { RequestHandler } from './$types';
import { prisma } from '$lib/server';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const claims = await prisma.claim.findMany();
	return json({ claims });
};
