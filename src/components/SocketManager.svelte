<script lang="ts">
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';

	import { socketStatus, yeelight } from '$root/stores/socket';

	import { startSocket, endSocket } from '$root/lib/edgeServer';

	const socket = startSocket();

	let serverConnection = '';
	let yeelightConnection = '';

	export let debugMode = 'off';
	export let volume: number | null = null;
	export let power = 'on';

	export let condition1 = '';
	export let condition2 = '';
	export let condition3 = '';

	export let error = '';

	setTimeout(() => {
		if (!socket.connected) {
			error = 'Edge server might be offline';
			console.debug(error);
		}
	}, 1000);

	const handleClick = (event) => {
		const message = event.target.innerText.split(':');
		let command = message[0];
		let valueList: Array<number> = new Array();

		if (message[1]) {
			const strValues = message[1].split(',');
			strValues.forEach((strValue: string) => {
				const num = parseInt(strValue);
				valueList.push(num);
			});
			socket.emit(command, valueList);
		} else socket.emit(command);
	};

	socket.on('main', (message) => {
		serverConnection = message;
		console.debug(message);
	});

	socket.on('yeelight', (message) => {
		yeelightConnection = message;
		console.debug(message);
	});

	socket.on('media', (pError) => {
		error = pError.path;
	});

	socket.on('setVolume', (message) => {
		const { success, pError } = message;

		if (success) console.debug(success);
		if (pError) error = pError;
	});

	socket.on('disconnect', () => {
		serverConnection = '';
		if ($yeelight) yeelightConnection = '';
		$socketStatus = 'none';

		console.debug('Socket is disconnected', error);
		error = '';
	});

	$: {
		$yeelight;
		serverConnection;
		yeelightConnection;
		socket.connected;

		if (socket.connected) {
			if (serverConnection && ($yeelight === 'off' || yeelightConnection)) {
				$socketStatus = 'ok';
			} else {
				$socketStatus = 'partial';
			}
		} else if ($socketStatus !== 'init') {
			$socketStatus = 'none';
		}
	}

	$: {
		volume;

		if (volume) {
			if (volume < 10) volume = 0;
			socket.emit('volumeChange', { interface: 1, volume });
		}
	}

	$: {
		power;

		if (power === 'shutdown') {
			socket.emit('shutdown');
		} else if (power === 'reboot') {
			socket.emit('reboot');
		}
	}

	setTimeout(() => {
		error = 'Connection failed';
	}, 3000);

	onDestroy(() => {
		if ($yeelight === 'on') socket.emit('endYeelight');
		endSocket(socket);
	});
</script>

{#if $socketStatus === condition1 || $socketStatus === condition2 || $socketStatus === condition3}
	<div class="load" out:fade>
		{#if error}
			{error}
			<a href="/apps">뒤로가기</a>
		{/if}
		<img src="/loading.gif" alt="" />
		{#if $socketStatus === 'init'}
			<span>디바이스가 없습니다</span>
		{:else if $socketStatus === 'none'}
			<span>로딩 중...</span>
		{:else}
			<span>스마트조명 연결 중...</span>
		{/if}
	</div>
{/if}

{#if debugMode === 'on'}
	<div>
		<button on:click={handleClick}>startYeelight</button>
		<button on:click={handleClick}>setYeelight: 255, 0, 0</button>
		<button on:click={handleClick}>setYeelight: 0, 255, 0</button>
		<button on:click={handleClick}>endYeelight</button>
	</div>
{/if}

<style>
	div {
		text-align: center;
		background-color: darkgray;
	}
	button {
		width: 50%;
		height: 40px;
		margin: 16px;
	}

	.load {
		position: fixed;
		padding: 0;
		margin: 0;

		top: 0;
		left: 0;
		z-index: 100;

		background-color: black;
		height: 100vh;
		width: 100vw;

		display: flex;
		gap: 32px;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		color: white;
		font-weight: 600;
	}
	.load > img {
		height: 120px;
	}
</style>
