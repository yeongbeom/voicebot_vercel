<script lang="ts">
	import { goto } from '$app/navigation';

	import { alarm } from '$root/stores/apps';

	const handler = () => {
		goto('/apps/alarm');
	};
</script>

<div class="widget-container" on:click={handler}>
	<svg viewBox="0 0 16 16">
		<path
			d="M8 2c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zM8 14.625c-3.107 0-5.625-2.518-5.625-5.625s2.518-5.625
		5.625-5.625c3.107 0 5.625 2.518 5.625 5.625s-2.518 5.625-5.625 5.625zM14.606 4.487c0.251-0.438 0.394-0.946
		0.394-1.487 0-1.657-1.343-3-3-3-0.966 0-1.825 0.457-2.374 1.166 2.061 0.426 3.831 1.644 4.98 3.322v0zM6.374
		1.166c-0.549-0.709-1.408-1.166-2.374-1.166-1.657 0-3 1.343-3 3 0 0.541 0.143 1.049 0.394 1.487 1.148-1.678
		2.919-2.896 4.98-3.322z"
		/>
		<path d="M8 9v-4h-1v5h4v-1z" />
	</svg>
	<div class="alarm__time">
		{#if $alarm.set}
			<div>{$alarm.hour}시 {$alarm.minute}분</div>
			<div class="ampm">{$alarm.ampm}</div>
		{:else}
			<div>미설정</div>
		{/if}
	</div>
</div>

<style>
	.widget-container {
		height: 100%;

		display: grid;
		grid-template-columns: 1fr 1.2fr;

		justify-items: center;
		align-items: center;

		padding: 18px;

		opacity: 0.7;
	}

	svg {
		height: 72px;
	}

	.alarm__time {
		font-size: 28px;
		font-weight: 600;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
	}

	.ampm {
		font-size: 24px;
	}
</style>
