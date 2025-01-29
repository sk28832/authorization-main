// routes/(portals)/manager/employees/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server';

export const load: PageServerLoad = async ({ cookies }) => {
  const authId = cookies.get('authId');
  if (!authId) throw redirect(303, '/signin');

  const auth = await prisma.auth.findUnique({
    where: { id: authId },
    include: { permissions: true }
  });

  if (!auth?.permissions.some(p => p.role === 'manager')) {
    throw redirect(303, '/');
  }

  const companyId = auth.permissions.find(p => p.role === 'manager')?.companyId;
  
  const employees = await prisma.employee.findMany({
    where: { companyId },
    orderBy: { name: 'asc' }
  });

  return { employees };
};