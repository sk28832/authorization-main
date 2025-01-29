// src/routes/(portals)/manager/employees/[employeeId]/claims/+page.server.ts -->
import type { Claim } from '@prisma/client';

export const load = async ({ fetch }) => {
	const res = await fetch(`/api/claims`);
	const data = (await res.json()) as { claims: Claim[] };
	return data;
};
