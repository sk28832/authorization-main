<!-- Return employee with :employeeId's claims. Implement fetching logic in /api/claims  -->

<script lang="ts">
	export let data;
</script>

Claims

<table>
	{#each data.claims as claim}
		<tr>
			<td>{claim.provider}</td>
			<td>{claim.amountCents} cents</td>
			<td>{claim.date}</td>
		</tr>
	{/each}
</table>
