// src/routes/api/card/+server.ts
// Accessible by both the specific employee or a manager of the employee's company
// routes/api/card/+server.ts
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server';

export const GET: RequestHandler = async ({ url, cookies }) => {
  const employeeId = url.searchParams.get('employeeId');
  if (!employeeId) throw error(400, 'Employee ID is required');

  const authId = cookies.get('authId');
  if (!authId) throw error(401);

  const [auth, employee] = await Promise.all([
    prisma.auth.findUnique({
      where: { id: authId },
      include: { employee: true, permissions: true }
    }),
    prisma.employee.findUnique({
      where: { id: employeeId }
    })
  ]);

  if (!auth || !employee) throw error(404);

  // Check access - either the employee themselves or their manager
  const hasAccess = 
    (auth.employee?.id === employeeId) || 
    auth.permissions.some(p => 
      p.role === 'manager' && p.companyId === employee.companyId
    );

  if (!hasAccess) throw error(403);

  const svg = `<svg height="40" width="200">
    <text x="5" y="30" stroke="blue">Card: ${employee.name}</text>
  </svg>`;

  return new Response(svg, { 
    headers: { 'Content-Type': 'image/svg+xml' }
  });
};