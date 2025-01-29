// routes/(portals)/manager/employees/[employeeId]/(root)/+page.server.ts
import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server';

export const load: PageServerLoad = async ({ cookies, params }) => {
  const authId = cookies.get('authId');
  if (!authId) throw redirect(303, '/signin');

  const auth = await prisma.auth.findUnique({
    where: { id: authId },
    include: { permissions: true }
  });

  if (!auth?.permissions.some(p => p.role === 'manager')) {
    throw redirect(303, '/');
  }

  const employee = await prisma.employee.findUnique({
    where: { id: params.employeeId }
  });

  if (!employee) throw error(404, 'Employee not found');

  const hasAccess = auth.permissions.some(p => 
    p.role === 'manager' && p.companyId === employee.companyId
  );

  if (!hasAccess) throw redirect(303, '/');

  return { employee };
};
