// routes/(portals)/employee/home/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server';

export const load: PageServerLoad = async ({ cookies, parent }) => {
  const authId = cookies.get('authId');
  if (!authId) throw redirect(303, '/signin');

  const employee = await prisma.employee.findUnique({
    where: { authId }
  });

  if (!employee) throw redirect(303, '/');

  // Get parent layout data
  const parentData = await parent();

  return {
    ...parentData, // Include parent layout data
    employeeId: employee.id
  };
};
