<script lang="ts">
	import SocketManager from '$root/components/SocketManager.svelte';

	import SlidableSection from '$root/components/SlidableSection.svelte';

	export let mode: string;
</script>

<SocketManager condition1="none" condition2="partial" condition3="init" />

<SlidableSection pressUrl="/apps">
	<video src="http://localhost:3080/{mode}" autoplay>
		<track kind="captions" />
	</video>
</SlidableSection>

<style>
	video {
		height: 100vh;
		width: 100vw;
		background-color: black;
	}
</style>
