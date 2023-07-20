<script lang="ts">
	import SlidableSection from '$root/components/SlidableSection.svelte';

	import { currentTime } from '$root/stores/apps';
</script>

<SlidableSection rightUrl="/apps">
	<div>
		{$currentTime}
		<!-- {$currentTime.slice(11, 14)} -->
	</div>
</SlidableSection>

<style>
	div {
		background-color: black;
		height: 100%;
		color: white;
		font-size: 64px;

		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
