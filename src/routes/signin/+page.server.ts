// routes/signin/+page.server.ts
import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  const authId = cookies.get('authId');
  if (authId) throw redirect(303, '/');
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    const auth = await prisma.auth.findUnique({ 
      where: { email, password }
    });
    
    if (!auth) return { failed: true };

    cookies.set('authId', auth.id, { path: '/' });

    // Get user roles
    const [employee, permissions] = await Promise.all([
      prisma.employee.findUnique({ where: { authId: auth.id } }),
      prisma.permission.findMany({ where: { authId: auth.id } })
    ]);

    // Priority order redirect
    if (permissions.some(p => p.role === 'manager')) {
      throw redirect(303, '/manager/claims');
    }
    if (permissions.some(p => p.role === 'hr')) {
      throw redirect(303, '/hr/employees');
    }
    if (employee) {
      throw redirect(303, '/employee/claims');
    }

    throw redirect(303, '/');
  }
};