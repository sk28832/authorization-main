<script lang="ts">
  import { enhance } from '$app/forms';
  
  export let form;
</script>

<form use:enhance method="post">
  <input type="email" name="email" placeholder="Email" required />
  <input type="password" name="password" placeholder="Password" required />
  <button type="submit">Sign in</button>
</form>

{#if form?.failed}
  <p>Sign in failed</p>
{/if}