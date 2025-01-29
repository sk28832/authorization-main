// routes/switch-role/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const roleId = data.get('roleId') as string;
    
    if (!roleId) throw redirect(303, '/');

    // Parse roleId to get the role type
    const roleType = roleId.split('-')[0];
    
    // Set the cookie first
    cookies.set('currentRoleId', roleId, { path: '/' });

    // Redirect based on the role type
    switch (roleType) {
      case 'manager':
        throw redirect(303, '/manager/claims');
      case 'hr':
        throw redirect(303, '/hr/employees');
      case 'employee':
        throw redirect(303, '/employee/home');
      default:
        throw redirect(303, '/');
    }
  }
} satisfies Actions;