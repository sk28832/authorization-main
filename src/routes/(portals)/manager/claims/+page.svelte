<script lang="ts">
  interface Claim {
    id: string;
    provider: string;
    amountCents: number;
    date: string;
    employee: {
      name: string;
    };
  }

  export let data: { claims: Claim[] };
</script>

<h1>Company Claims</h1>

<table>
  <thead>
    <tr>
      <th>Employee</th>
      <th>Provider</th>
      <th>Amount</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    {#each data.claims as claim}
      <tr>
        <td>{claim.employee.name}</td>
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