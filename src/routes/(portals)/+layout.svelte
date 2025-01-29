<script lang="ts">
	interface Role {
	  id: string;
	  role: string;
	  companyName: string;
	}
  
	interface LayoutData {
	  roles: Role[];
	  currentRole: string;
	  currentRoleId: string;
	}
  
	export let data: LayoutData;
  </script>
  
  <nav>
	{#if data.roles.length > 1}
	  <form method="POST" action="/switch-role">
		<select 
		  name="roleId" 
		  value={data.currentRoleId} 
		  on:change={e => e.currentTarget.form?.submit()}
		>
		  {#each data.roles as role}
			<option value={role.id}>
			  {role.role} at {role.companyName}
			</option>
		  {/each}
		</select>
		<input type="hidden" name="role" value={data.roles.find(r => r.id === data.currentRoleId)?.role} />
	  </form>
	{/if}
  
	{#if data.currentRole === 'employee'}
	  <a href="/employee/home">Home</a>
	  <a href="/employee/claims">My Claims</a>
	{/if}
  
	{#if data.currentRole === 'manager'}
	  <a href="/manager/claims">All Claims</a>
	  <a href="/manager/employees">Employees</a>
	{/if}
  
	{#if data.currentRole === 'hr'}
	  <a href="/hr/employees">HR Dashboard</a>
	  <a href="/hr/billing">Billing</a>
	{/if}
  
	<a href="/signout" data-sveltekit-preload-data="off">Sign Out</a>
  </nav>
  
  <slot />