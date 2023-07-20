<script lang="ts">
	import { onMount } from 'svelte';

	import { debugMode } from '$root/stores/config';

	let Carousel; // for saving Carousel component class
	let carousel; // for calling methods of the carousel instance

	onMount(async () => {
		const module = await import('svelte-carousel');
		Carousel = module.default;
	});

	let therapyMode = 'sample';
</script>

{#if $debugMode === 'on'}
	<input type="text" bind:value={therapyMode} />
	<a href="/apps/therapy/{therapyMode}">테라피</a>
{/if}

<div class="therapy-container">
	<div class="carousel-container">
		<svelte:component this={Carousel} bind:this={carousel}>
			<div id="auto" class="carousel-item">자동</div>
			<div id="upset" class="carousel-item">흥분</div>
			<div id="happy" class="carousel-item">기쁨</div>
			<div id="depressed" class="carousel-item">우울</div>
			<div id="tired" class="carousel-item">피로</div>
			<div id="annoyed" class="carousel-item">짜증</div>

			<div id="bonfire" class="carousel-item">모닥불</div>
			<div id="rain" class="carousel-item">비</div>
			<div id="meditation" class="carousel-item">명상</div>
		</svelte:component>
	</div>
	<span>공감 테라피</span>
</div>

<style>
	.therapy-container {
		width: 41.4vw;
		height: 100%;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 32px;

		font-size: 22px;
		font-weight: 600;
		opacity: 0.8;
	}

	.carousel-container {
		width: 100%;

		display: flex;
		align-items: center;
	}

	.carousel-item {
		display: flex;
		justify-content: center;
		align-items: center;

		font-size: 72px;
		height: 160px;
	}
</style>
