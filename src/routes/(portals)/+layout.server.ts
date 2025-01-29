import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const authId = cookies.get('authId');
  if (!authId) throw redirect(303, '/signin');

  const auth = await prisma.auth.findUnique({
    where: { id: authId },
    include: {
      employee: {
        include: { company: true }
      },
      permissions: {
        include: { company: true }
      }
    }
  });

  if (!auth) throw redirect(303, '/signin');

  const roles = auth.permissions.map(p => ({
    role: p.role,
    companyName: p.company.name,
    id: `${p.role}-${p.companyId}`
  }));

  if (auth.employee) {
    roles.push({
      role: 'employee',
      companyName: auth.employee.company.name,
      id: `employee-${auth.employee.companyId}`
    });
  }

  // Get or set initial currentRole
  let currentRoleId = cookies.get('currentRoleId');
  if (!currentRoleId || !roles.find(r => r.id === currentRoleId)) {
    currentRoleId = roles[0]?.id;
    if (currentRoleId) {
      cookies.set('currentRoleId', currentRoleId, { path: '/' });
    }
  }

  const currentRole = roles.find(r => r.id === currentRoleId);

  return {
    roles,
    currentRoleId,
    currentRole: currentRole?.role || roles[0]?.role
  };
};