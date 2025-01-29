import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server';
import type { Actions, PageServerLoad } from './$types';

interface RoleOption {
  role: string;
  companyName: string;
  companyId: string;
}

export const load: PageServerLoad = async ({ cookies }) => {
  const authId = cookies.get('authId');
  if (authId && cookies.get('needsRoleSelection') !== 'true') {
    throw redirect(303, '/');
  }
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    
    // Role selection step
    if (data.get('step') === 'role') {
      const role = data.get('role') as string;
      const companyId = data.get('companyId') as string;
      cookies.delete('needsRoleSelection', { path: '/' });
      throw redirect(303, getRedirectPath(role));
    }

    const email = data.get('email') as string;
    const password = data.get('password') as string;

    const auth = await prisma.auth.findUnique({ 
      where: { email, password }
    });
    
    if (!auth) return { failed: true };

    cookies.set('authId', auth.id, { path: '/' });

    // Get roles with company info
    const [employee, permissions] = await Promise.all([
      prisma.employee.findUnique({
        where: { authId: auth.id },
        include: { company: true }
      }),
      prisma.permission.findMany({
        where: { authId: auth.id },
        include: { company: true }
      })
    ]);

    const roles: RoleOption[] = [];
    
    if (employee) {
      roles.push({
        role: 'employee',
        companyName: employee.company.name,
        companyId: employee.company.id
      });
    }

    permissions.forEach(p => {
      roles.push({
        role: p.role,
        companyName: p.company.name,
        companyId: p.company.id
      });
    });

    console.log('All roles:', roles);

    // Always show selection if there's more than one role
    if (roles.length > 1) {
      cookies.set('needsRoleSelection', 'true', { path: '/' });
      return { roles };
    }

    // Only redirect if exactly one role
    if (roles.length === 1) {
      throw redirect(303, getRedirectPath(roles[0].role));
    }

    return { failed: true };
  }
};

function getRedirectPath(role: string): string {
  switch (role) {
    case 'manager': return '/manager/claims';
    case 'hr': return '/hr/employees';
    case 'employee': return '/employee/claims';
    default: return '/';
  }
}