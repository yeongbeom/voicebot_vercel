<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';

	import { currentStatus, status } from '$root/stores/bot';
	import { reloadApp } from '$root/utils/reloadApp';

	import ErrorMessage from '$root/components/ErrorMessage.svelte';

	const dispatch = createEventDispatcher();
	let error = false;
	let message: string;
	let recognition: any = null;

	let active = true;

	onMount(() => {
		console.debug('SpeechRecognition.svelte mounted');

		// @ts-ignore
		if (!(window.webkitSpeechRecognition || window.SpeechRecognition)) {
			error = true;
			message = 'Speech Recognition is Not Available!';
			throw new Error(message);
		}

		// @ts-ignore
		recognition = new webkitSpeechRecognition() || new SpeechRecognition();

		recognition.lang = 'ko-KR';
		recognition.interimResults = true;

		recognition.onstart = () => {
			// console.debug(`Speech recognition started | ${$currentStatus}`);

			if ($currentStatus === $status.idle) {
				dispatch('speech-onstart-idle');
			} else {
				dispatch('speech-onstart-else');

				setTimeout(() => {
					recognition.stop();
				}, 200);
			}
		};

		recognition.onresult = (event: any) => {
			if ($currentStatus === $status.idle || $currentStatus === $status.listening) {
				dispatch('speech-onresult', event);
			}
		};

		recognition.onerror = (event: any) => {
			if (event.error !== 'no-speech' && event.error !== 'network') {
				let today = new Date();
				console.error(today.toLocaleDateString(), today.toLocaleTimeString());
				console.error('Speech Recognition Error');
				console.error(event.error);

				if (event.error === 'audio-capture') {
					reloadApp(window, 500);
					console.error(event.error);
				}
			}
		};

		recognition.onend = () => {
			// console.debug(`Speech recognition ended | ${$currentStatus}`);
			dispatch('speech-onend');

			if (!active) return; // prevent from unintended restarting
			recognition.start();
		};

		recognition.start();
	});

	onDestroy(() => {
		active = false;

		if (recognition !== null) {
			console.debug(`${recognition} is being stopped`);
			recognition.stop();
		}
		console.debug(`SpeechRecognition.svelte destroyed | active: ${active}`);
	});
</script>

<ErrorMessage {error}>{message}</ErrorMessage>
