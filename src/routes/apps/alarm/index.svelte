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
	import { onMount, onDestroy } from 'svelte';

	import { alarm, currentTime } from '$root/stores/apps';

	import Counter from '$root/components/shared/Counter.svelte';
	import BackSvg from '$root/components/shared/BackSvg.svelte';
	import Radio from '$root/components/shared/Radio.svelte';

	$alarm.ampm = '오후';

	export let mobile: string;

	export const ampmOptions = [
		{
			value: '오전',
			label: '오전'
		},
		{
			value: '오후',
			label: '오후'
		}
	];

	onMount(() => {
		console.debug('/apps/alarm/index.svelte mounted');
	});
	onDestroy(() => {
		console.debug('/apps/alarm/index.svelte destroyed');
	});
</script>

<div class="section-container">
	<div class="header">
		<a href="/apps"><BackSvg /></a>
		<span style={'font-size: 32px'}> 알람 </span>
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
		<h2>{$currentTime}</h2>
		<div class="counter" class:disabled={$alarm.set}>
			<h3>시간</h3>
			<h3>분</h3>
			<Counter bind:count={$alarm.hour} />
			<Counter bind:count={$alarm.minute} />
		</div>
		<div class="set">
			<span class:disabled={$alarm.set}>
				<Radio options={ampmOptions} fontSize={22} bind:userSelected={$alarm.ampm} />
			</span>
			<span>
				<button on:click={() => ($alarm.set = !$alarm.set)}
					>{$alarm.set ? '취소' : '알람 설정'}</button
				>
			</span>
		</div>
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

	h2 {
		margin: 32px;
		color: #696969;
		text-align: center;
	}

	h3 {
		color: #696969;
	}
	.counter {
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-items: center;
		align-items: center;

		margin: auto 72px;
	}

	.set {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 4vh 8vw;
	}

	.section-container button {
		width: 30vw;
		height: 18vh;
		border: none;
		outline: none;
		color: #fff;
		cursor: pointer;
		font-size: 20px;
		/* padding: 17px 0; */
		/* margin-top: 20px; */
		border-radius: 12px;
		background: #4a98f7;
	}

	.disabled {
		opacity: 0.6;
		pointer-events: none;
	}
</style>
