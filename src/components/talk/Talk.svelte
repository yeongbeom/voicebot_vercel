<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';

	import ErrorMessage from '$root/components/ErrorMessage.svelte';

	import { fetchTtsData, fetchEmpathyData } from '$root/api/talk';

	import {
		currentStatus,
		currentExpression,
		isTalking,
		status,
		expression,
		heard,
		say
	} from '$root/stores/bot';
	
	import SpeechRecog from '$root/components/talk/SpeechRecog.svelte';
	import MediaRec from '$root/components/talk/MediaRec.svelte';
	import { reloadApp } from '$root/utils/reloadApp';
	import uid from '$root/stores/uid';

	let error = false;
	let message: string;

	let hasMounted = false;

	let stream: any = null;
	let mediaRecorder: any = null;
	let audioSource: any;

	let command: string | null = null;
	let cmdResText: string;
	let cmdResEmotion: string;
	let continued = false;

	const DELAY_RELOAD = 500; // 1000 * 3;
	const WATCHDOG_LIMIT = 50; // 20;
	let watchdogTimer = 0;
	let IdleTimer = 0;

	const setIdle = () => {
		$currentStatus = $status.idle;
	};

	const stopRunningApps = () => {
		if (mediaRecorder !== null) {
			console.debug(`${mediaRecorder} is being stopped`);
			console.log(`${mediaRecorder} is being stopped`);
			mediaRecorder.stop();
		}
		if (stream !== null) {
			stream
				.getTracks() // get all tracks from the MediaStream
				.forEach((track: any) => {
					console.debug(`${track} is being stopped`);
					track.stop();
				}); // stop each of them
		}
	};

	const startMediaRecorder = async () => {
		stopRunningApps();

		try {
			stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaRecorder = new MediaRecorder(stream);
		} catch (err) {
			error = true;
			message = err as string;
			throw new Error(message);
		}
	};

	const handleSpeechOnstartIdle = async () => {
		// console.log(`handleSpeechOnstartIdle | ${mediaRecorder.state}`);
		watchdogTimer = 0;
		IdleTimer ++;
		// console.log("IdleTimer: ", IdleTimer)
		if (IdleTimer > 300){
			reloadApp(window, 500)
		}
		if (audioSource && audioSource.removeEventListenr) {
			audioSource.removeEventListenr('ended', setIdle);
		}

		try {
			mediaRecorder.start();
		} catch (error) {
			await startMediaRecorder();
			console.error(`MediaRecorder restarted due to error: ${error}`);
		}
	};
	const handleSpeechOnstartElse = () => {
		// console.log(`handleSpeechOnstartElse | ${mediaRecorder.state}`);
		IdleTimer = 0;
		if (
			($currentStatus === $status.thinking || $currentStatus === $status.talking) &&
			watchdogTimer < WATCHDOG_LIMIT
		) {
			// console.debug(`watchdogTimer: ${watchdogTimer} times`);
			watchdogTimer++;
		} else if (watchdogTimer >= WATCHDOG_LIMIT) {
			reloadApp(window, DELAY_RELOAD);
		}
	};
	const handleSpeechOnresult = (event: any) => {
		// console.log(`handleSpeechOnresult | ${mediaRecorder.state}`);
		const { results } = event.detail;
		$currentStatus = $status.listening;
		const text = Array.from(results)
			.map((result: any) => result[0])
			.map((result) => result.transcript)
			.join('');

		if (results[0].isFinal) {
			/*
			if (text.includes('테라피') || text.includes('날씨') || text.includes('알람')) {
				command = '/apps';
				cmdResText = '서비스 화면으로 안내합니다.';
				cmdResEmotion = $expression.neutral;
			} else if (text.includes('시계')) {
				command = '/apps/clock';
				cmdResText = '시계 화면으로 안내합니다.';
				cmdResEmotion = $expression.neutral;
			}

			if (text.includes('아파') && !continued) {
				command = 'emergency';
				cmdResText = '많이 아프세요?';
				cmdResEmotion = $expression.neutral;

				continued = true;
			} else if (text.includes('아파') && continued) {
				command = 'emergency';
				cmdResText = '응급상황이 탐지되어, 비상연락처로 연락하겠습니다.';
				cmdResEmotion = $expression.worry;

				continued = false;
			}
			*/

			$say = text;
		}
		// console.log('mediaRecorder.state in handleSpeechOnresult: ' + mediaRecorder.state);
		$heard = text;
	};
	const handleSpeechOnend = () => {
		// console.log('handleSpeechOnend')
		// console.log('handleSpeechOnend | ${mediaRecorder.state}');
		if ($currentStatus === $status.listening){
			console.log("Utterance: " + $heard);
			// console.log('$currentStatus === $status.listening');
			// console.log(mediaRecorder.state);
			$currentStatus = $status.thinking;
			if (mediaRecorder.state === 'inactive'){
				// console.log('inactive! inactive! inactive! inactive! inactive!');
				mediaRecorder.start()
				// console.log(mediaRecorder.state);
			}
		}
		if (mediaRecorder.state === 'recording'){
			// console.log('mediaRecorder.state === recording');
			mediaRecorder.stop();
		}
	};
	const handleRecordOnstop = async (event: any) => {

		// console.log("text from handleRecordOnstop: " + $heard);
		// console.log(`handleRecordOnstop | ${mediaRecorder.state}`);
		const audio = event.detail;

		///////////////////////////////////// ### KETI Version ### /////////////////////////////////////
		// console.log("uid: " + "nipa_" + array[0] + "-utterance")
		const empathyReq = {
			audio,
			text: $heard,
			uid: $uid  // 'nipa_1234567890-utterance'
		};
		/////////////////////////////////////////////////////////////////////////////////////////////////////
		

		///////////////////////////////////// ### Original Version ### /////////////////////////////////////
		// const empathyReq = {
		// 	audio,
		// 	text: $heard,
		// 	uid: $uid  // 'nipa-utterance'
		// };		
		/////////////////////////////////////////////////////////////////////////////////////////////////////

		try {
			let empathyRes; // [TODO] connect to db
			watchdogTimer = 0;
			console.log("request text: " + $heard);

			if (!command) empathyRes = await fetchEmpathyData(empathyReq);

			console.log("response text: " + empathyRes.text);

			/////////////////////////////////////  Original ver //////////////////////////////////////
			// const audioData: ArrayBuffer = await fetchTtsData(command ? cmdResText : empathyRes.text);

			// const audioCtx = new AudioContext();
			// audioCtx.decodeAudioData(audioData, (buffer) => {
			// 	audioSource = audioCtx.createBufferSource();
			// 	audioSource.addEventListener('ended', setIdle);
			// 	audioSource.buffer = buffer;
			// 	audioSource.connect(audioCtx.destination);
			// 	audioSource.start(0);
			// });
			///////////////////////////////////////////////////////////////////////////////////


			/////////////////////////////////////  KETI ver  //////////////////////////////////
			function _base64ToArrayBuffer(base64: any) {
				var binary_string = window.atob(base64);
				var len = binary_string.length;
				var bytes = new Uint8Array(len);
				for (var i = 0; i < len; i++) {
					bytes[i] = binary_string.charCodeAt(i);
				}
				return bytes.buffer;
			}

			try {
				const audioData = _base64ToArrayBuffer(empathyRes.audio)
				const audioCtx = new AudioContext();

				audioCtx.decodeAudioData(audioData, (buffer) => {
					audioSource = audioCtx.createBufferSource();
					audioSource.addEventListener('ended', setIdle);
					audioSource.buffer = buffer;
					audioSource.connect(audioCtx.destination);
					console.log("talking status: " + $currentStatus);
					audioSource.start(0);
				});
			} catch (error) {
				console.error('fetchTtsData error: ' + error);
			}
			///////////////////////////////////////////////////////////////////////////////////
			
			//@ts-ignore
			$currentExpression = $expression[command ? cmdResEmotion : empathyRes.emotion];
			$say = command ? cmdResText : empathyRes.text;
			$currentStatus = $status.talking;
		} catch (error) {
			setIdle();
			console.error(`${error} (${$currentStatus})`);
		}
	};

	const onStatusChange = () => {
		$isTalking = false;

		switch ($currentStatus) {
			case $status.init: {
				$currentExpression = $expression.neutral;
				$currentStatus = $status.idle;
				$say = '연결 중...<br />잠시만 기다려주세요';
				break;
			}
			case $status.idle: {
				$currentExpression = $expression.neutral;

				if (command !== 'emergency' && command !== null) goto(command);
				if (!command) continued = false;
				command = null;

				break;
			}
			case $status.listening: {
				$currentExpression = $expression.listen;
				break;
			}
			case $status.thinking: {
				$currentExpression = $expression.think;
				break;
			}
			case $status.talking: {
				$isTalking = true;
				break;
			}
			default: {
				throw new Error('Invalid status change');
			}
		}
	};

	$: {
		$currentStatus;
		onStatusChange();
	}

	onMount(async () => {
		console.debug('Talk.svelte mounted');

		await startMediaRecorder();

		$currentStatus = $status.idle;
		$say = '안녕하세요';

		hasMounted = true;
	});

	onDestroy(async () => {
		await stopRunningApps();

		console.debug(`Talk.svelte destroyed`);
	});
</script>

{#if hasMounted}
	<SpeechRecog
		on:speech-onstart-idle={handleSpeechOnstartIdle}
		on:speech-onstart-else={handleSpeechOnstartElse}
		on:speech-onresult={handleSpeechOnresult}
		on:speech-onend={handleSpeechOnend}
	/>
	<MediaRec {mediaRecorder} on:record-onstop={handleRecordOnstop} />
	<ErrorMessage {error}>{message}</ErrorMessage>
{/if}

<!-- <div>
	-> {$say}
</div>

<div>
	-> {$heard}
</div>

<div>
	-> {$currentExpression}
</div>
<div>
	-> {$currentStatus}
</div> -->
