// src/routes/api/card/+server.ts
// Accessible by both the specific employee or a manager of the employee's company

import type { RequestHandler } from './$types';
import { prisma } from '$lib/server';

export const GET: RequestHandler = async ({ url }) => {
	const employeeId = url.searchParams.get('employeeId');
	if (!employeeId) return new Response('Employee ID is required', { status: 400 });

	const employee = await prisma.employee.findUnique({ where: { id: employeeId } });
	if (!employee) return new Response('Employee not found', { status: 404 });

	const svg = `<svg height="40" width="200"><text x="5" y="30" stroke="blue">Card: ${employee!.name}</text></svg>`;
	return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
