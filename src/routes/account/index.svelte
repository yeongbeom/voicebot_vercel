<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ session }) => {
		console.debug(`/account (SSR): ${session.user?.emergencyMobile}`);
		// if (!session.user) {
		// 	return {
		// 		status: 302,
		// 		redirect: '/apps'
		// 	};
		// }

		return {
			status: 200,
			props: {
				mobile: session.user?.emergencyMobile ?? '비회원'
			}
		};
	};
</script>

<script lang="ts">
	import { socketStatus } from '$root/stores/socket';

	import BackSvg from '$root/components/shared/BackSvg.svelte';

	import Settings from '$root/components/settings/Settings.svelte';

	export let mobile: string;
</script>

<div class="section-container">
	<div class="header">
		{#if $socketStatus === 'ok' || $socketStatus === 'init'}
			<a href="/apps"><BackSvg /></a>
		{:else}
			<span />
		{/if}
		<span style={'font-size: 32px'}> 설정 </span>
		<span>
			{#if mobile === '비회원'}
				{mobile}
			{:else if mobile.length === 7}
				010 {mobile.slice(0, 3)} {mobile.slice(3, 8)}
			{:else if mobile.length === 8}
				010 {mobile.slice(0, 4)} {mobile.slice(4, 9)}
			{/if}
		</span>
	</div>
	<div class="content">
		<Settings />
	</div>
</div>

<style>
	.section-container {
		height: 100%;
		padding: var(--grid-padding__top) var(--grid-padding__left);

		display: grid;
		column-gap: var(--grid-column-gap);
		row-gap: var(--grid-row-gap);
		grid-template-rows: var(--grid-column__header) calc(
				86vh - var(--grid-row-gap) - var(--grid-padding__top) * 2
			);
	}

	.header {
		border: 3px solid darkgray;
		border-radius: var(--border-radius);
		box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;

		display: grid;
		grid-template-columns: repeat(3, 1fr);
		justify-items: center;
		align-items: center;

		background-color: var(--color-bg-primary);
	}

	.content {
		border: 3px solid darkgray;
		border-radius: var(--border-radius);
		box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;

		padding: var(--spacing-32);

		background-color: var(--color-bg-primary);
	}
</style>
