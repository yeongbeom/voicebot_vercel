<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import { character, debugMode, webrtcStream } from '$root/stores/config';

	import SlidableSection from '$root/components/SlidableSection.svelte';
	import Talk from '$root/components/talk/Talk.svelte';
	import SampleExpression from '$root/components/expressions/SampleExpression.svelte';
	import MaleKittyExpression from '$root/components/expressions/MaleKittyExpression.svelte';
	import FemaleKittyExpression from '$root/components/expressions/FemaleKittyExpression.svelte';
	import SpeechBubble from '$root/components/expressions/SpeechBubble.svelte';
	import WebRtc from '$root/components/WebRtc.svelte';
	import TestExpression from '$root/components/expressions/TestExpression.svelte';
	import TestText from '$root/components/expressions/TestText.svelte';
	import mikeTp from '$root/stores/mike';
	import uid from '$root/stores/uid';
	
	onMount(() => {
		console.debug('index.svelte mounted');
		// sessionStorage.setItem('mikeTp', 'off')
	});

	onDestroy(() => {
		console.debug('index.svelte destroyed');
	});

	const handleMike = () => {
		if ($mikeTp === 'off') {
			$mikeTp = 'on';
		} else {
			$mikeTp = 'off';
		}
	};

	const handleUid = () => {
		const curDate = new Date;
		const timeInfo = (curDate.getMonth() + 1)+curDate.getDate() + "_" 
						+ curDate.getHours() + curDate.getMinutes() + curDate.getSeconds();
		const newId = new Uint32Array(1);
		crypto.getRandomValues(newId);
		const newUid = "nipa_cha_" + timeInfo + "_" + newId[0] + "-utterance";
		$uid = newUid;
	}
</script>

<svelte:head>
	<title>Voicebot</title>
</svelte:head>


{#if $mikeTp === 'on'}
	<Talk />
{/if}
<SlidableSection leftUrl="/apps">
	<div class="voicebot">
		{#if $character === 'male_kitty'}
			<MaleKittyExpression />
		{:else if $character === 'female_kitty'}
			<FemaleKittyExpression />
		{:else if $character === 'sample'}
			<div class="expression">
				<SampleExpression />
			</div>
			<div class="speech-bubble">
				<SpeechBubble />
			</div>
		{/if}
		
		<div class="btn-group">
			<div class="change-mike">
				<a href="/" on:click={handleMike}>
					{#if $mikeTp === 'on'}
						<img src="/mike_on.png" width="60" alt="mike on" />
					{:else}
						<img src="/mike_off.png" width="60" alt="mike on" />
					{/if}
				</a>	
			</div>
			<div class="change-user">
				<a href="/" on:click={handleUid} title="new Uid">
					<img src="/change-user.png" width="60"  alt="new Uid" />		
				</a>
			</div>
		</div>
	</div>
</SlidableSection>
{#if $webrtcStream === 'on'}
	<WebRtc />
{/if}

{#if $debugMode === 'on'}
	<div>
		<TestExpression />
		<TestText />
	</div>
{/if}

<style>
	div.voicebot {
		display: grid;
		grid-template-columns: 1fr;
	}
	div.voicebot div {
		grid-row-start: 1;
		grid-column-start: 1;
	}
	.btn-group {
		position: absolute;
		width: 800px;
		height: 50px;
  }
	.change-mike {
		position: relative;
		float: right;
		top: 30px;
		right: 80px;
	}
	.change-user {
		position: relative;
		float: right;
		top:100px;
		left: 40px;
		/* border: 1px solid; */
	}
</style>
