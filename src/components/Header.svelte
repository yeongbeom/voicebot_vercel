<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { enhance } from '$root/actions/form';

	import { clickOutside } from '$root/actions/clickOutside';
	import Button from '$root/components/shared/Button.svelte';

	import SettingSvg from '$root/components/shared/SettingSvg.svelte';
	import LogoutSvg from '$root/components/shared/LogoutSvg.svelte';

	export let user: any;
	export let focus = false;
	export let highlight = false;
	export let mobile: string | undefined = '';

	const dispatch = createEventDispatcher();

	$: {
		mobile;

		if (mobile) {
			if (mobile.length < 7) highlight = false;
			else if (mobile.length >= 7 && mobile.length <= 8) highlight = true;

			if (mobile.length === 8) focus = false;
			else if (mobile.length > 8) mobile = mobile.substring(0, 8);
		} else {
			highlight = false;
		}
	}

	$: user, (focus = false);
</script>

<div>
	<span class="setting">
		<a href="/account">
			<SettingSvg />
		</a>
	</span>
	<form
		on:click={() => {
			if (!user) focus = true;
		}}
		class:focus
		class:disabled={user}
		action="/apps"
		method="post"
		id="user"
		use:enhance={{
			result: async (response) => {
				const result = await response.json();
				if (mobile) dispatch('submit', { emergencyMobile: mobile });
				if (result.error) dispatch('error', result.error);
			}
		}}
	>
		<span>
			{#if user}
				<span class:user in:fade>
					{#if mobile?.length === 7}
						비상연락망 010 {mobile.slice(0, 3)} {mobile.slice(3, 8)}
					{:else if mobile?.length === 8}
						비상연락망 010 {mobile.slice(0, 4)} {mobile.slice(4, 9)}
					{/if}
				</span>
			{:else}휴대폰 010
				<input
					type="text"
					name="mobile"
					aria-label="Emergency mobile"
					placeholder="비상연락망"
					minlength="7"
					maxlength="8"
					pattern="[0-9]+"
					required
					autocomplete="off"
					bind:value={mobile}
					on:focus={() => (focus = true)}
					use:clickOutside
					on:click_outside={() => (focus = false)}
				/>
			{/if}
		</span>
	</form>

	{#if !user}
		<span>
			<Button bind:highlight disabled={true} type="submit" form="user">로그인</Button>
		</span>
	{:else}
		<span in:fade>
			<a href="/auth/logout"><LogoutSvg /></a>
		</span>
	{/if}
</div>

<style>
	div {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		height: 100%;
		align-content: center;
	}

	form {
		display: flex;
		justify-content: center;

		height: 4.8rem;

		border: 1px solid #d3d3d3;
		border-radius: 0.8rem;
	}

	form.focus {
		border: 3px solid var(--color-text-highlight);
	}

	form.disabled {
		border: none;
	}

	input {
		font-size: var(--font-18);
		height: 3.2rem;
		width: 11.5rem;

		text-align: center;
		letter-spacing: 0.2rem;
		font-family: var(--font-serif);
		background-color: inherit;

		border: none;
	}

	input:disabled {
		color: var(--color-text-primary);
		background-color: transparent;
	}

	input::placeholder {
		color: gray;
	}

	input:focus {
		outline: none;
		caret-color: transparent;
	}

	span,
	span > a {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	span.user {
		font-weight: bold;
		opacity: 0.8;
	}
</style>
