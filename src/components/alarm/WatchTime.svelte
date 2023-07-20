<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { alarm, ring, currentTime } from '$root/stores/apps';

	$: {
		if (!$alarm.set) {
			$ring = false;
			ringtoneAudio?.pause();
		}
	}

	$: if ($ring) {
		ringtoneAudio?.play();
		goto('/apps/alarm');
	}

	let ringtoneAudio: any;

	const interval = setInterval(() => {
		// console.debug('WatchTime.svelte');
		let date = new Date(),
			h = date.getHours(),
			m = date.getMinutes(),
			s = date.getSeconds(),
			currentAmpm = '오전';
		if (h >= 12) {
			h = h - 12;
			currentAmpm = '오후';
		}
		h = h == 0 ? (h = 12) : h;
		$currentTime = `${h}시 ${m}분 ${s}초 ${currentAmpm}`;

		if (
			$alarm.set &&
			!$ring &&
			$alarm.hour === h &&
			$alarm.minute === m &&
			$alarm.ampm === currentAmpm
		) {
			$ring = true;
		}
	}, 1000);

	onMount(() => {
		console.debug('WatchTime.svelte mounted');
		ringtoneAudio = new Audio('/ringtone.mp3');
	});

	onDestroy(() => {
		clearInterval(interval);
		ringtoneAudio?.pause();
		console.debug('WatchTime.svelte destroyed');
	});
</script>
