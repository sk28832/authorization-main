/*

Implement an api endpoint that can return an employee's claims or an entire company's claims.

You can create multiple endpoints like `/api/claims/:employeeId` or something similar. Don't feel you have to shove everything into just `/api/claims`

Just make sure the data returned is for the right role. 

*/

// routes/api/claims/+server.ts
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server';
import { json, error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
  const authId = cookies.get('authId');
  if (!authId) throw error(401);

  const currentRoleId = cookies.get('currentRoleId') as string;

  const auth = await prisma.auth.findUnique({
    where: { id: authId },
    include: {
      employee: true,
      permissions: true
    }
  });

  if (!auth) throw error(401);

  // Employee - get their claims
  if (currentRoleId === 'employee' && auth.employee) {
    const claims = await prisma.claim.findMany({
      where: { employeeId: auth.employee.id },
      orderBy: { date: 'desc' }
    });
    return json({ claims });
  }

  // Manager - get company claims
  if (currentRoleId === 'manager' && auth.permissions.some(p => p.role === 'manager')) {
    const companyId = auth.permissions.find(p => p.role === 'manager')?.companyId;
    const claims = await prisma.claim.findMany({
      where: {
        employee: { companyId }
      },
      include: {
        employee: { select: { name: true } }
      },
      orderBy: { date: 'desc' }
    });
    return json({ claims });
  }

  throw error(403);
};