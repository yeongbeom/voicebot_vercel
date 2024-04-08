<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { endpoints } from '$root/api/endpoints';
	import { webrtcStart, webrtcStop } from '$root/api/webrtc';
	import { debugMode, monitoring } from '$root/stores/config';

	const webrtcParamsMonitoring = {
		'use-datachannel': 'off',
		'datachannel-parameters': '{"ordered": true}',
		'audio-codec': 'opus/48000/2',
		'use-video': 'on',
		'use-audio': 'on',
		'video-resolution': '320x240',
		'video-transform': '',
		'video-codec': 'H264/90000',
		'use-stun': 'on'
	};

	const webrtcParamsEmpathy = {
		'datachannel-parameters': '{"ordered": true}',
		'audio-codec': 'opus/48000/2',
		'use-video': 'on',
		'video-resolution': '320x240',
		'video-transform': 'edges',
		'video-codec': 'H264/90000',
		'use-stun': 'on'
	};
	let webrtcMonitoring: any, webrtcEmpathy: any;

	const userId = 'web_월일-시분초_난수'; // [TODO] connect to db

	onMount(() => {
		console.debug('WebRtc.svelte mounted');

		const genDomElem = (name = '') => {
			return {
				startBtn: document.getElementById(`start${name}`),
				stopBtn: document.getElementById(`stop${name}`),
				mediaDiv: document.getElementById(`media${name}`),
				dataChannelLog: document.getElementById(`data-channel${name}`),
				iceConnectionLog: document.getElementById(`ice-connection-state${name}`),
				iceGatheringLog: document.getElementById(`ice-gathering-state${name}`),
				signalingLog: document.getElementById(`signaling-state${name}`),
				webrtcVideo: document.getElementById(`webrtc-video${name}`),
				webrtcAudio: document.getElementById(`webrtc-audio${name}`)
			};
		};
		const domElemMonitoring = genDomElem('-local');
		const domElemEmpathy = genDomElem('-remote');
		if ($debugMode === 'on') {
			domElemMonitoring.mediaDiv.style.display = 'block';
			domElemEmpathy.mediaDiv.style.display = 'block';
		}

		try {
			if ($monitoring === 'on') {
				webrtcMonitoring = webrtcStart(
					endpoints.offerMonitoring,
					webrtcParamsMonitoring,
					domElemMonitoring,
					userId
				);
			}
			webrtcEmpathy = webrtcStart(
				endpoints.offerEmpathy,
				webrtcParamsEmpathy,
				domElemEmpathy,
				userId
			);
		} catch (error) {
			console.error(error);
		}
	});

	onDestroy(() => {
		console.debug('WebRtc destroyed');
		// webrtcStop(webrtcMonitoring);
		// webrtcStop(webrtcEmpathy);
	});
</script>

<div class="flex-container">
	<div class="flex-col" id="media-local" style="display: none">
		<h1>Monitoring</h1>

		<audio id="webrtc-audio-local" autoplay />
		<video id="webrtc-video-local" autoplay playsinline>
			<track kind="captions" />
		</video>
	</div>
	<div class="flex-col" id="media-remote" style="display: none">
		<h1>Empathy</h1>

		<audio id="webrtc-audio-remote" autoplay />
		<video id="webrtc-video-remote" autoplay playsinline>
			<track kind="captions" />
		</video>
	</div>
</div>

{#if $debugMode === 'on'}
	<div class="flex-container">
		<div class="flex-col">
			<h2>State</h2>
			<p>ICE gathering state: <span id="ice-gathering-state-local" /></p>
			<p>ICE connection state: <span id="ice-connection-state-local" /></p>
			<p>Signaling state: <span id="signaling-state-local" /></p>

			<h2>Data channel</h2>
			<pre id="data-channel-local" style="height: 200px" />
		</div>
		<div class="flex-col">
			<h2>State</h2>
			<p>ICE gathering state: <span id="ice-gathering-state-remote" /></p>
			<p>
				ICE connection state: <span id="ice-connection-state-remote" />
			</p>
			<p>Signaling state: <span id="signaling-state-remote" /></p>

			<h2>Data channel</h2>
			<pre id="data-channel-remote" style="height: 200px" />
		</div>
	</div>

	<style>
		.flex-container {
			display: flex;
		}

		pre {
			overflow: scroll;
		}
	</style>
{/if}
