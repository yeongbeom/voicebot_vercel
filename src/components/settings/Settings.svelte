<script lang="ts">
	import { character, debugMode, webrtcStream, monitoring } from '$root/stores/config';
	import { socketStatus, yeelight } from '$root/stores/socket';

	import SocketManager from '$root/components/SocketManager.svelte';

	import Slider from '$root/components/shared/Slider.svelte';
	import Radio from '$root/components/shared/Radio.svelte';
	import Switch from '$root/components/shared/Switch.svelte';

	import { characterOptions, sexOptions, ageOptions, lightOptions } from './options';

	let developer = false;
	let age: boolean;
	let sex: string;
	let volume: number | null = null; // [TODO]: get volume info from edge server
	let power: string;

	const handleVolumeChange = (event: CustomEvent) => {
		volume = event.detail;
	};

	const handleShutdown = () => {
		power = 'shutdown';
	};

	const handleReboot = () => {
		power = 'reboot';
	};
</script>

<SocketManager bind:volume {power} />

<div class="grid-container">
	<span>캐릭터</span>
	<Radio
		options={characterOptions}
		fontSize={16}
		flexDirection={'row'}
		legend=""
		bind:userSelected={$character}
	/>

	<span>사용자 성별</span>
	<Radio
		options={sexOptions}
		fontSize={16}
		flexDirection={'row'}
		legend=""
		bind:userSelected={sex}
	/>

	<span>사용자 나이</span>
	<Radio
		options={ageOptions}
		fontSize={16}
		flexDirection={'row'}
		legend=""
		bind:userSelected={age}
	/>

	<span class:disabled={$socketStatus === 'none' || $socketStatus === 'init'}>볼륨</span>
	<Slider
		disabled={$socketStatus === 'none' || $socketStatus === 'init'}
		on:change={handleVolumeChange}
		{volume}
	/>

	<span class:disabled={$socketStatus === 'none' || $socketStatus === 'init'}>스마트조명</span>
	<Radio
		disabled={$socketStatus === 'none' || $socketStatus === 'init'}
		options={lightOptions}
		fontSize={16}
		flexDirection={'row'}
		legend=""
		bind:userSelected={$yeelight}
	/>

	<span>와이파이</span>
	<span>정상 연결 상태</span>

	<span class:disabled={$socketStatus === 'none' || $socketStatus === 'init'}>전원제어</span>
	<span class:disabled={$socketStatus === 'none' || $socketStatus === 'init'}>
		<button
			disabled={$socketStatus === 'none' || $socketStatus === 'init'}
			on:click={handleShutdown}>전원끄기</button
		>
		<button disabled={$socketStatus === 'none' || $socketStatus === 'init'} on:click={handleReboot}
			>재시작</button
		>
	</span>

	<span>버전</span>
	<span on:click={() => (developer = !developer)}> 최신 버전</span>

	<span style="visibility: {developer ? 'visible' : 'hidden'}">Developer</span>
	<div class="developer" style="visibility: {developer ? 'visible' : 'hidden'}">
		<Switch bind:value={$debugMode} label="Debug Mode" design="slider" />
		<Switch bind:value={$webrtcStream} label="WebRTC" design="slider" />
		<Switch bind:value={$monitoring} label="Monitoring" design="slider" />
	</div>
</div>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: 42px;
		justify-items: center;
		padding-right: 40px;

		height: 100%;

		overflow: auto;
	}

	.disabled {
		color: lightgray;
	}

	button {
		width: 120px;
		margin: auto 24px;
	}

	button:disabled {
		pointer-events: none;
	}
</style>
