<script lang="ts">
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import { swipe, tap } from 'svelte-gestures';

	export let height = '100vh';
	let sign: number;

	export let pressUrl: string | null = null;
	export let leftUrl: string | null = null;
	export let rightUrl: string | null = null;

	const handler = (event: any) => {
		const direction = event.detail.direction;

		const selection = event.detail.target.id;
		if (
			[
				'auto',
				'upset',
				'happy',
				'depressed',
				'tired',
				'annoyed',
				'bonfire',
				'rain',
				'meditation'
			].includes(selection)
		) {
			if (!direction) {
				const clickAudio = new Audio('/click.mp3');
				clickAudio.play();

				goto(`/apps/therapy/${selection}`);
			}
		}

		const exception = event.detail.target.classList;
		if (exception.contains('carousel-item')) return;
		else if (exception.contains('therapy-container')) return;
		else if (exception.contains('sc-carousel__arrow-container')) return;
		else if (exception.contains('sc-carousel-arrow__arrow')) return;
		else if (exception.contains('sc-carousel-button')) return;
		else if (exception.contains('sc-carousel__carousel-container')) return;

		if (direction === 'left' && leftUrl !== null) {
			const swipeAudio = new Audio('/swipe.mp3');
			swipeAudio.play();

			sign = -1;
			goto(leftUrl);
		} else if (direction === 'right' && rightUrl !== null) {
			const swipeAudio = new Audio('/swipe.mp3');
			swipeAudio.play();

			sign = 1;
			goto(rightUrl);
		}

		if (direction === undefined) {
			if (pressUrl) {
				const clickAudio = new Audio('/click.mp3');
				clickAudio.play();

				goto(pressUrl);
			} else if (leftUrl !== null && rightUrl === null) {
				const swipeAudio = new Audio('/swipe.mp3');
				swipeAudio.play();

				sign = -1;
				goto(leftUrl);
			} else if (leftUrl === null && rightUrl !== null) {
				const swipeAudio = new Audio('/swipe.mp3');
				swipeAudio.play();

				sign = 1;
				goto(rightUrl);
			}
		}

		console.debug(`direction: ${direction}`);
	};
</script>

<section
	use:tap={{ timeframe: 300 }}
	on:tap={handler}
	use:swipe={{ timeframe: 300, minSwipeDistance: 60 }}
	on:swipe={handler}
	in:fly={{ x: 800 * sign, duration: 250, delay: 300 }}
	out:fly={{ x: 800 * sign, duration: 250 }}
	style="--height: {height}"
>
	<slot />
</section>

<style>
	section {
		height: var(--height);
	}
</style>
