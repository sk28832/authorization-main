# Authorization

Protect the site!

`npm run dev` - runs site

`npm run db:reset` - reset the database

`npm run db:studio` - open a GUI to interact with the database

look at `prisma/schema.prisma`

**Code must be clean!** Good variable names, no redundant code, no boilerplate, etc.

Generally, try to push a commit at least for each step of the way so we can make sure you don't get too stuck.

There are three "roles" which are employee, hr, manager. hr and manager are represented as a "permission" attached to the auth model while employee is just if the auth object has a connected employee object.

This is meant to be a rough outline of the project, but feel free to add files like `+page.server.ts` files (there are places you'll definitely need them like under `/manager/employees`) or rearrange things if you think there's a better abstraction.

## Requirements in order of importance. Better to get each working one by one even if you don't get through all of them then do meh on all of them.

1. Make sure each page / api route actually works and returns the correct info. For employees, they see their own claims while managers see claims for the entire company for example. Signed out users can't access protected routes. Should be mostly self-evident or page has a comment explaining. Linking between pages is part of this (like `/manager/employees` should link to `/manager/employees/[employeeId]` for example). Much of how you do this though depends on how you do the next step, so feel free to do both at the same time.

1. Make sure that each page route is accessible to the correct user based on permission role. Solution must minimize boilerplate and redundant code must be avoided, and design it in such a way that adding a new role (say we wanted to add a "doctor") role, would be trivial to add to a page. So employees shouldn't be able to access manager pages, hr shouldn't be able to access employee, etc. Some users have multiple permission roles and should be able to jump between easily. Pages should have a comment that explains how the route is protected. We're looking for a clean solution, not a hacky one that works.

1. Make sure the API routes are accessible to the correct user based on permission role. Same situation, limit access to users with the right permissions and minimize boilerplate and redundant code.

1. Add a "view as" button for Manager in `/manager/employees/[employeeId]` to "view as" an employee to see what an employee sees. On clicking the button, site should redirect to routes only that employee has access to. There also must be a way to exit out of this so manager can return to their own view.

1. Ability for managers to cycle through all the companies they manage easily. The russell@yuzu.health user has access to two companies, and it should be easy to switch between.

1. Consolidate `/hr/employees` and `/manager/employees` into one route `/employees` and show different views based on the user's role.

1. Make the site actually look nice.
