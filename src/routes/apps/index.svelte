<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ session, props }) => {
		console.debug(`/apps (SSR): ${session.user?.emergencyMobile}`);

		if (session.user) {
			return {
				status: 302,
				props
			};
		}

		return { props };
	};
</script>

<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { session } from '$app/stores';

	import ErrorMessage from '$root/components/ErrorMessage.svelte';
	import Keypad from '$root/components/Keypad.svelte';
	import SlidableSection from '$root/components/SlidableSection.svelte';

	import Header from '$root/components/Header.svelte';
	import Therapy from '$root/components/Therapy.svelte';
	import Weather from '$root/components/Weather.svelte';
	import Alarm from '$root/components/alarm/Alarm.svelte';

	let mobile: string | undefined;

	let focus = false;

	let error = '';
	// let success = '';

	if ($session.user) mobile = $session.user.emergencyMobile;

	const handleSubmit = (event: CustomEvent<{ emergencyMobile: string }>) => {
		$session.user = event.detail;
	};

	onMount(() => {
		console.debug('apps/index.svelte mounted');
	});

	onDestroy(() => {
		console.debug('apps/index.svelte destroyed');
	});
</script>

<svelte:head>
	<title>Applications</title>
</svelte:head>

<ErrorMessage error={Boolean(error)}>{error}</ErrorMessage>

<SlidableSection rightUrl="/" leftUrl="/apps/clock">
	<div class="grid-container">
		<div class="header">
			<Header
				on:error={(event) => (error = event.detail)}
				on:submit={handleSubmit}
				user={$session.user}
				bind:focus
				bind:mobile
			/>
		</div>
		<div class="content__left">
			<Therapy />
		</div>
		<div class="content__rightup"><Weather /></div>
		<div class="content__rightdown"><Alarm /></div>
	</div>
	{#if focus}
		<div class="modal">
			<Keypad bind:value={mobile} />
		</div>
	{/if}
</SlidableSection>

<style>
	.grid-container {
		height: 100%;
		padding: var(--grid-padding__top) var(--grid-padding__left);

		display: grid;
		column-gap: var(--grid-column-gap);
		row-gap: var(--grid-row-gap);
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: var(--grid-column__header) repeat(
				2,
				calc(43vh - var(--grid-row-gap) - var(--grid-padding__top))
			);
	}

	.header {
		grid-row-start: 1;
		grid-row-end: 2;
		grid-column-start: 1;
		grid-column-end: 3;

		border: 3px solid darkgray;
		border-radius: var(--border-radius);
		box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;

		background-color: var(--color-bg-primary);
	}

	.content__left {
		grid-row-start: 2;
		grid-row-end: 4;
		grid-column-start: 1;
		grid-column-end: 2;

		border: 3px solid darkgray;
		border-radius: var(--border-radius);
		box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;

		background: linear-gradient(to bottom, #e9edc9 0%, #d2dbb4 100%);
		opacity: 0.7;
	}

	.content__rightup {
		border: 3px solid darkgray;
		border-radius: var(--border-radius);
		box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;

		background: linear-gradient(to bottom, #bee9fdb3 0%, #9de2ffad 100%);
		opacity: 0.7;
	}

	.content__rightdown {
		border: 3px solid darkgray;
		border-radius: var(--border-radius);
		box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;

		background: linear-gradient(to bottom, #f4e1b1b7 0%, #f3c496d2 100%);
		opacity: 0.7;
	}

	.modal {
		position: fixed; /* Stay in place */
		z-index: 1; /* Sit on top */
		top: calc(var(--grid-padding__top) + var(--grid-column__header) + var(--grid-row-gap));
		left: calc(50% - 220px);

		height: calc(
			100% - var(--grid-padding__top) * 2 - var(--grid-column__header) - var(--grid-row-gap)
		);
	}
</style>
