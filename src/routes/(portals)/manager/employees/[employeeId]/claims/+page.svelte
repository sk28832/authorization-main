<!-- src/routes/(portals)/manager/employees/[employeeId]/claims/+page.svelte -->
<!-- Return employee with :employeeId's claims. Implement fetching logic in /api/claims  -->

<script lang="ts">
  import type { Claim } from '@prisma/client';

  export let data: { claims: Claim[] };
</script>

<h1>Employee Claims</h1>

<table>
  <thead>
    <tr>
      <th>Provider</th>
      <th>Amount</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    {#each data.claims as claim}
      <tr>
        <td>{claim.provider}</td>
        <td>${claim.amountCents / 100}</td>
        <td>{new Date(claim.date).toLocaleDateString()}</td>
      </tr>
    {/each}
  </tbody>
</table>

{#if data.claims.length === 0}
  <p>No claims found.</p>
{/if}