<script lang="ts">
	// import { createEventDispatcher } from 'svelte';
	export let value = '';

	// const dispatch = createEventDispatcher();

	const select = (num: number) => () => {
		value += num;
		// dispatch('pin', num);
	};
	const clear = () => {
		value = '';
		// dispatch('clear', value);
	};
	const del = () => {
		value = value.slice(0, -1);
		// dispatch('del');
	};
</script>

<keypad class="keypad">
	<button on:click={select(1)}>1</button>
	<button on:click={select(2)}>2</button>
	<button on:click={select(3)}>3</button>
	<button on:click={select(4)}>4</button>
	<button on:click={select(5)}>5</button>
	<button on:click={select(6)}>6</button>
	<button on:click={select(7)}>7</button>
	<button on:click={select(8)}>8</button>
	<button on:click={select(9)}>9</button>

	<button disabled={!value} on:click={clear}>지우기</button>
	<button on:click={select(0)}>0</button>
	<button disabled={!value} on:click={del}>삭제</button>
</keypad>

<style>
	.keypad {
		display: grid;
		grid-gap: 0.5%;
		height: 100%;
		grid-template-columns: repeat(3, 33%);
		grid-template-rows: repeat(4, 24.625%);

		padding: 0.4rem;
		background-color: rgba(0, 0, 0, 0.05);
		border-radius: 8px;
	}

	button {
		background-color: #ffffff;
		border: 1px solid lightgray;
		border-radius: 8px;
		/* box-sizing: border-box; */
		color: #696969;
		cursor: pointer;
		display: inline-block;
		/* font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif; */
		font-size: 16px;
		font-weight: 600;
		line-height: 20px;
		/* margin: 0; */
		/* outline: none; */
		/* padding: 13px 23px; */
		/* position: relative; */
		/* text-align: center; */
		/* text-decoration: none; */
		touch-action: manipulation;
		transition: box-shadow 0.2s, -ms-transform 0.1s, -webkit-transform 0.1s, transform 0.1s;
		user-select: none;
		-webkit-user-select: none;
		width: 140px;
	}

	button:focus-visible {
		box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
		transition: box-shadow 0.2s;
	}

	button:active {
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
