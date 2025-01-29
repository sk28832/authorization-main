import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const roleId = data.get('roleId') as string;
    const role = data.get('role') as string;
    
    if (roleId && role) {
      cookies.set('currentRoleId', roleId, { path: '/' });
      
      // Redirect to appropriate route based on role
      switch (role) {
        case 'manager':
          throw redirect(303, '/manager/claims');
        case 'hr':
          throw redirect(303, '/hr/employees');
        case 'employee':
          throw redirect(303, '/employee/home');
      }
    }

    throw redirect(303, '/');
  }
} satisfies Actions;