<script lang="ts">
  import { enhance } from '$app/forms';
  export let form;
</script>

{#if !form?.roles}
  <form use:enhance method="post">
    <input type="email" name="email" placeholder="Email" required />
    <input type="password" name="password" placeholder="Password" required />
    <button type="submit">Sign in</button>
  </form>
{:else if form.roles.length > 0}
  <form use:enhance method="post">
    <input type="hidden" name="step" value="role" />
    {#each form.roles as { role, companyName, companyId }}
      <button 
        type="submit" 
        name="role" 
        value={role}
      >
        Continue as {role} at {companyName}
      </button>
      <input type="hidden" name="companyId" value={companyId} />
    {/each}
  </form>
{/if}

{#if form?.failed}
  <p>Sign in failed</p>
{/if}