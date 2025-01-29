<!-- src/routes/(portals)/manager/employees/[employeeId]/(root)/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let svg = '';

	onMount(async () => {
		const res = await fetch(`/api/card?employeeId=${$page.params.employeeId}`);
		svg = await res.text();
	});
</script>

<div>
	{@html svg}
</div>
