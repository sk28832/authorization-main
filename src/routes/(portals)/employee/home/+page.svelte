<!-- src/routes/(portals)/employee/home/+page.svelte -->
<!-- Accessible to only signed in users with an Employee record  -->

<script lang="ts">
  import { onMount } from 'svelte';

  interface PageData {
    employeeId: string;
    roles: Array<{ role: string; companyName: string; id: string; }>;
    currentRoleId: string;
    currentRole: string;
  }

  export let data: PageData;
  let svg = '';

  onMount(async () => {
    const res = await fetch(`/api/card?employeeId=${data.employeeId}`);
    svg = await res.text();
  });
</script>

<div>
  {@html svg}
</div>