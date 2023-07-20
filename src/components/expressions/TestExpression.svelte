<script lang="ts">
	import { currentExpression, currentStatus, isTalking } from '$root/stores/bot';

	const changeExpression = (event: any) => {
		$currentExpression = event.target.innerText.toLowerCase();
	};
	const toggleTalkStatus = () => {
		$isTalking = !$isTalking;
	};
	const updateStatus = (event: any) => {
		$currentStatus = event.target.innerText.toLowerCase();
	};
</script>

<div class="expressions">
	<!-- control emotional expressions -->
	<div>
		<button on:click={changeExpression}>neutral</button>
		<button on:click={changeExpression}>happiness</button>
		<button on:click={changeExpression}>disgust</button>
		<button on:click={changeExpression}>surprise</button>
		<button on:click={changeExpression}>anger</button>
		<button on:click={changeExpression}>sadness</button>
		<button on:click={changeExpression}>fear</button>
		<button on:click={changeExpression}>worry</button>
		<button on:click={changeExpression}>contempt</button>
	</div>
	<!-- control other expressions -->
	<div>
		<button on:click={changeExpression}>think</button>
		<button on:click={changeExpression}>listen</button>
	</div>
	<!-- control talking status -->
	<div>
		<button on:click={toggleTalkStatus}>talking</button>
	</div>
</div>

<div class="speech-bubble">
	<!-- control status -->
	<button on:click={updateStatus}>init</button>
	<button on:click={updateStatus}>idle</button>
	<button on:click={updateStatus}>listening</button>
	<button on:click={updateStatus}>thinking</button>
	<button on:click={updateStatus}>talking</button>
</div>

<style>
	button {
		width: 9rem;
		height: 3rem;
	}
	div.expressions > div:nth-child(1) > button {
		background-color: white;
	}
	div.expressions > div:nth-child(2) > button {
		background-color: antiquewhite;
	}
	div.expressions > div:nth-child(3) > button {
		background-color: gray;
	}
</style>
