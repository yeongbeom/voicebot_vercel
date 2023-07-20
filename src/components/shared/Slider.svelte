<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let volume: number;
	export let disabled: boolean;

	const dispatch = createEventDispatcher();

	const handleVolume = () => {
		dispatch('change', volume);
	};
</script>

<div class="slidecontainer">
	<input
		{disabled}
		on:change={handleVolume}
		type="range"
		min="0"
		max="150"
		bind:value={volume}
		class="slider"
		id="volume"
	/>
</div>

<style>
	.slidecontainer {
		width: 100%; /* Width of the outside container */
	}

	/* The slider itself */
	.slider {
		-webkit-appearance: none; /* Override default CSS styles */
		appearance: none;
		width: 100%; /* Full-width */
		height: 25px; /* Specified height */
		background: #d3d3d3; /* Grey background */
		outline: none; /* Remove outline */
		opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
		-webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
		transition: opacity 0.2s;
		border-radius: 8px;
	}

	.slider:disabled {
		background: gray; /* Grey background */
	}

	/* Mouse-over effects */
	.slider:hover {
		opacity: 1; /* Fully shown on mouse-over */
	}

	/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
	.slider::-webkit-slider-thumb {
		-webkit-appearance: none; /* Override default look */
		appearance: none;
		width: 25px; /* Set a specific slider handle width */
		height: 25px; /* Slider handle height */
		background: cornflowerblue;
		cursor: pointer; /* Cursor on hover */
		border-radius: 8px;
	}

	.slider::-moz-range-thumb {
		width: 25px; /* Set a specific slider handle width */
		height: 25px; /* Slider handle height */
		background: #04aa6d; /* Green background */
		cursor: pointer; /* Cursor on hover */
	}
</style>
