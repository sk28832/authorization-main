<!-- Accessible to sign OUT users only. Signed in users should redirect -->

<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<a href="/signin">Sign In</a>
<a href="/signout" data-sveltekit-preload-data="off">Sign Out</a>

<br />
<br />

<form method="post" action="/api/waitlist" use:enhance>
	Waitlist
	<input name="email" type="email" required placeholder="Email" />
	<button type="submit">Join Waitlist</button>
</form>
