<script lang="ts">
	import { onMount } from 'svelte';

	import { resize } from '$root/actions/resize';
	import { currentStatus, heard, say, status } from '$root/stores/bot';
	import { fontSize } from '$root/stores/ui';

	export let bubbleColor = '#2B2B2B';
	export let textColor = '#FFFFFF';
	export let msgColor = '#FFFFFF;';
	export let expressionSize = 300;

	let size: number;
	let exprSize = `${expressionSize}px`;
	let top: string;
	let left: string;
	let width: string;

	let path = 'M58.6451 254.298L29.4936 311.56L7.43998 293.115L58.6451 254.298Z';

	const onUiChange = () => {
		switch ($fontSize) {
			case 'small':
				size = 16;
				break;
			case 'medium':
				size = 25;
				break;
			case 'large':
				size = 32;
				break;
			default:
				throw new Error('Invalid font change');
		}
	};

	const onStatusChange = () => {
		msgColor = textColor;
		bubbleColor = '#2B2B2B';

		switch ($currentStatus) {
			case $status.init: {
				break;
			}
			case $status.idle: {
				break;
			}
			case $status.listening: {
				msgColor = '#A9A9A9';
				bubbleColor = '#0059FF';
				break;
			}
			case $status.thinking: {
				bubbleColor = '#41A201';
				break;
			}
			case $status.talking: {
				break;
			}
			default: {
				throw new Error('Invalid status change');
			}
		}
	};

	$: {
		$fontSize;
		onUiChange();
	}

	$: {
		$currentStatus;
		onStatusChange();
	}

	const mediaQueryString = 'screen and (max-width: 767px), (orientation: portrait)';

	const putBubble = (matches: boolean) => {
		if (matches) {
			path = 'M58.6451 254.298L29.4936 311.56L7.43998 293.115L58.6451 254.298Z';
			top = '330px';
			left = '0px';
			width = '100%';
		} else {
			path = 'M281.527 177.738L391.62 102.15L409.853 140.772L281.527 177.738Z';
			top = '90px';
			left = '430px';
			width = '50%';
		}
	};

	const handleResize = (event: CustomEvent) => {
		putBubble(event.detail.matches);
	};

	onMount(() => {
		const matches = window.matchMedia(mediaQueryString).matches;
		putBubble(matches);
	});
</script>

<div
	use:resize={mediaQueryString}
	on:change={handleResize}
	class="msg-section"
	style="--width: {width}"
>
	<svg
		class="tip"
		width={exprSize}
		height={exprSize}
		viewBox="0 0 250 250"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path id="bubble__path" d={path} fill={bubbleColor} />
	</svg>
	<div
		class="bubble"
		style="--font-size: {size}px;--top: {top}; --left: {left}; --bubble-color: {bubbleColor}; --text-color: {textColor}"
	>
		{#if $currentStatus === $status.init}
			{@html $say}
		{:else if $currentStatus === $status.idle}
			{@html $say}
		{:else if $currentStatus === $status.listening}
			<div class="effect">
				<table>
					<tr><td><i /></td><td><i /></td><td><i /></td></tr>
				</table>
			</div>
			<div>듣는 중...<br /></div>
			<div class="heard" style="--msg-color: {msgColor}">
				{@html $heard}
			</div>
		{:else if $currentStatus === $status.thinking}
			<div class="effect">
				<table>
					<tr><td><i /></td><td><i /></td><td><i /></td></tr>
				</table>
			</div>
			<div>생각 중...<br /></div>
		{:else if $currentStatus === $status.talking}
			{@html $say}
		{/if}
	</div>
</div>

<style>
	:root {
		--point-color: #ffae00;
	}

	.tip {
		overflow: visible;
	}

	.msg-section {
		width: var(--width);
		display: grid;
		grid-template-columns: 1fr;
	}

	.msg-section svg,
	.msg-section .bubble {
		grid-row-start: 1;
		grid-column-start: 1;
	}

	.bubble {
		width: 90%;
		margin-top: var(--top);
		margin-left: var(--left);
		overflow-wrap: break-word;
		height: max-content;
		max-height: 50%;
		border-radius: 10px;
		font-weight: bolder;
		overflow: scroll;
		text-align: center;
		font-size: var(--font-size);
		padding: 40px;
		color: var(--text-color);
		background-color: var(--bubble-color);
	}

	.heard {
		margin: 0 auto;
		color: var(--msg-color);
	}

	.bubble::-webkit-scrollbar {
		display: none;
	}

	.effect table {
		margin: 0 auto;
	}
	.effect table tr:first-child td {
		height: 20px;
		padding-left: 8px;
	}
	.effect i {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: var(--point-color);
		float: left;
	}
	.effect tr td:first-child i {
		animation: _stateAni 3s infinite;
	}
	.effect tr td:nth-child(2) i {
		animation: _stateAni 3s infinite;
		animation-delay: 0.5s;
	}
	.effect tr td:last-child i {
		animation: _stateAni 3s infinite;
		animation-delay: 1s;
	}
	@keyframes _stateAni {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
</style>
