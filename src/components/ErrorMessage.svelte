<script lang="ts">
	export let error: boolean;
</script>

{#if error}
	<div>
		<slot />
	</div>
{/if}

<style>
	div {
		padding: 0.5rem;
		background-color: red;
		text-align: center;
		font-weight: bold;
	}
</style>
