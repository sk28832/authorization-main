import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const roles = {
	manager: 'manager',
	hr: 'hr'
};

const company1 = await prisma.company.create({ data: { name: 'Company1.com' } });

const company2 = await prisma.company.create({ data: { name: 'Company2.org' } });

await prisma.auth.create({
	data: {
		id: '1',
		email: 'ryan@yuzu.health',
		password: 'password',
		permissions: {
			create: { role: roles.manager, company: { connect: { id: company1.id } } }
		}
	}
});

await prisma.auth.create({
	data: {
		email: 'russell@yuzu.health',
		password: 'password',
		permissions: {
			create: [
				{ role: roles.manager, company: { connect: { id: company1.id } } },
				{ role: roles.manager, company: { connect: { id: company2.id } } }
			]
		}
	}
});

await prisma.auth.create({
	data: {
		email: 'brian@company.com',
		password: 'password',
		employee: {
			create: {
				id: '2',
				name: 'Brian',
				company: { connect: { id: company1.id } },
				claims: {
					create: [
						{ provider: 'Mount Sinai', amountCents: 100000, date: new Date() },
						{ provider: 'Lenox', amountCents: 99901, date: new Date() }
					]
				}
			}
		}
	}
});

await prisma.auth.create({
	data: {
		email: 'dean@company.com',
		password: 'password',
		employee: {
			create: {
				name: 'Dean',
				company: { connect: { id: company1.id } },
				claims: {
					create: [
						{ provider: 'Sloan Kettering', amountCents: 100000, date: new Date() },
						{ provider: 'Urgent', amountCents: 99099, date: new Date() }
					]
				}
			}
		},
		permissions: {
			create: { role: roles.hr, company: { connect: { id: company1.id } } }
		}
	}
});

await prisma.auth.create({
	data: {
		email: 'ben@company.com',
		password: 'password',
		permissions: {
			create: { role: roles.hr, company: { connect: { id: company1.id } } }
		}
	}
});

await prisma.auth.create({
	data: {
		email: 'brian2@company.org',
		password: 'password',
		employee: {
			create: {
				name: 'Brian2',
				company: { connect: { id: company2.id } },
				claims: {
					create: [
						{ provider: 'Primary', amountCents: 100000, date: new Date() },
						{ provider: 'Blah', amountCents: 99099, date: new Date() }
					]
				}
			}
		}
	}
});
