<script lang="ts">
	import { say, heard } from '$root/stores/bot';

	let text: string;

	$: $say = text;
	$: $heard = text;
</script>

<div>
	<input bind:value={text} type="text" />
</div>

<style>
	input {
		height: 4rem;
		width: 100vw;
	}
</style>
