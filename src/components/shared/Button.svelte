<script lang="ts">
	export let type: string | null = null;
	export let form: string | null = null;
	export let highlight: boolean | null = null;
	export let disabled = false;

	$: {
		if (highlight === true) disabled = false;
		else if (highlight === false) disabled = true;
	}
</script>

<button class:highlight {disabled} {type} {form}><slot /></button>

<style>
	button {
		/* background-color: #ffffff; */
		background-color: transparent;
		border: 1px solid #d3d3d3;
		border-radius: 8px;

		/* box-sizing: border-box; */
		cursor: pointer;
		display: inline-block;

		color: gray;
		font-family: var(--font-serif);
		font-size: 18px;
		/* font-weight: 600; */

		line-height: 20px;
		/* margin: 0; */
		/* outline: none; */
		/* padding: 15px 18px; */
		/* position: relative; */
		/* text-align: center; */
		/* text-decoration: none; */
		touch-action: manipulation;
		transition: box-shadow 0.2s, -ms-transform 0.1s, -webkit-transform 0.1s, transform 0.1s;
		user-select: none;
		-webkit-user-select: none;
		/* width: auto; */

		width: 80px;
		height: 48px;
	}

	button.highlight {
		color: #222222;
		border: 3px solid var(--color-text-highlight);
	}

	button:focus-visible {
		box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
		transition: box-shadow 0.2s;
	}

	button:active :not(disabled) {
		background-color: #f7f7f7;
		border-color: #000000;
		transform: scale(0.96);
	}

	button:disabled {
		border-color: #dddddd;
		color: #dddddd;
		cursor: not-allowed;
		opacity: 1;
	}
</style>
