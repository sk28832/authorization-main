<!-- src/routes/(portals)/hr/employees/+page.svelte -->
<!-- Display a table of company employees -->

<script lang="ts">
  interface Employee {
    id: string;
    name: string;
  }

  export let data: { employees: Employee[] };
</script>

<h1>Company Employees</h1>

<table>
  <thead>
    <tr>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    {#each data.employees as employee}
      <tr>
        <td>{employee.name}</td>
      </tr>
    {/each}
  </tbody>
</table>

{#if data.employees.length === 0}
  <p>No employees found.</p>
{/if}
