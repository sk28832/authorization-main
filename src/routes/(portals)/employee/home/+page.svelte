<!-- Accessible to only signed in users with an Employee record  -->

<script lang="ts">
	import { onMount } from 'svelte';

	let svg = '';

	onMount(async () => {
		const res = await fetch(`/api/card?employeeId=${'2'}`);
		svg = await res.text();
	});
</script>

<div>
	{@html svg}
</div>
