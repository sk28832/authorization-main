// routes/(portals)/employee/claims/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server';

export const load: PageServerLoad = async ({ cookies }) => {
  const authId = cookies.get('authId');
  if (!authId) throw redirect(303, '/signin');

  const employee = await prisma.employee.findUnique({
    where: { authId },
    include: { claims: true }
  });

  if (!employee) throw redirect(303, '/signin');

  return { claims: employee.claims };
};