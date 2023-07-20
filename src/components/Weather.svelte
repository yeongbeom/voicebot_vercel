<script lang="ts">
	import { onMount } from 'svelte';

	import { weatherApiKey } from '$root/api/keys';
	import { translate, dict } from '$root/utils/weatherDataTranslate';

	let weather: any;
	let location: string;
	let humidity: number;
	let temp: number;
	let description: string;
	let speed: number;

	const getCurrentWeather = async (lat: number, lon: number) => {
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`
		);

		if (!res.ok) {
			const { message } = await res.json();
			throw new Error(message);
		}

		weather = await res.json();

		location = translate(weather.name) ? translate(weather.name) : weather.name;
		temp = Math.round(weather.main.temp - 273.1);
		description = translate(weather.weather[0].main)
			? translate(weather.weather[0].main)
			: weather.weather[0].main;
		humidity = weather.main.humidity;
		speed = Math.round((weather.wind.speed * 10) / 10);
	};

	onMount(() => {
		const options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};

		const success = async (pos) => {
			const crd = pos.coords;

			getCurrentWeather(crd.latitude, crd.longitude);
		};

		const error = (err) => {
			console.warn(`ERROR(${err.code}): ${err.message}`);

			const gwangju = {
				lat: 35.1865889,
				lon: 126.8752554
			};
			getCurrentWeather(gwangju.lat, gwangju.lon);
		};

		navigator.geolocation.getCurrentPosition(success, error, options);
	});
</script>

{#if weather}
	<div class="widget-container">
		<div class="icon">
			{#if description === dict.Clear}
				<svg viewBox="0 0 24 24">
					<path
						d="M13 4l-1 2.934-1-2.934c-.188-.553.106-1.152.659-1.341.552-.188 1.153.107 1.341.659.078.23.072.469 0 .682zM4 11l2.934 1-2.934 1c-.553.188-1.152-.106-1.341-.659-.188-.552.107-1.153.659-1.341.23-.078.469-.072.682 0zM11 20l1-2.934 1 2.934c.188.553-.106 1.152-.659 1.341-.552.188-1.152-.106-1.341-.659-.078-.23-.072-.469 0-.682zM20 12.998l-2.934-1 2.934-1c.553-.188 1.152.106 1.341.659.188.552-.106 1.152-.659 1.341-.23.078-.469.072-.682 0zM7.05 5.636l1.367 2.781-2.781-1.367c-.524-.257-.74-.891-.483-1.414.258-.523.891-.739 1.414-.482.218.107.383.28.483.482zM5.636 16.949l2.781-1.367-1.367 2.781c-.257.523-.891.739-1.414.482-.523-.258-.739-.891-.482-1.414.107-.218.28-.382.482-.482zM16.949 18.363l-1.367-2.781 2.781 1.367c.523.257.739.891.482 1.414-.258.523-.891.739-1.414.482-.218-.107-.382-.28-.482-.482zM18.362 7.048l-2.782 1.368 1.368-2.782c.257-.523.891-.739 1.414-.482.523.258.739.891.481 1.415-.106.217-.279.381-.481.481zM12 16.5c-2.481 0-4.5-2.019-4.5-4.5s2.019-4.5 4.5-4.5 4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5zm0-7c-1.379 0-2.5 1.121-2.5 2.5s1.121 2.5 2.5 2.5 2.5-1.121 2.5-2.5-1.121-2.5-2.5-2.5z"
					/>
				</svg>
			{:else if description === dict.Clouds}
				<svg viewBox="0 0 24 24">
					<path
						d="M17 19h-11c-2.206 0-4-1.794-4-4 0-1.861 1.277-3.429 3.001-3.874l-.001-.126c0-3.309 2.691-6 6-6 2.587 0 4.824 1.638 5.65 4.015 2.942-.246 5.35 2.113 5.35 4.985 0 2.757-2.243 5-5 5zm-11.095-6.006c-1.008.006-1.905.903-1.905 2.006s.897 2 2 2h11c1.654 0 3-1.346 3-3s-1.346-3-3-3c-.243 0-.5.041-.81.13l-1.075.307-.186-1.103c-.325-1.932-1.977-3.334-3.929-3.334-2.206 0-4 1.794-4 4 0 .272.027.545.082.811l.244 1.199-1.421-.016z"
					/>
				</svg>
			{:else if description === dict.Rain}
				<svg viewBox="0 0 24 24">
					<path
						d="M17 18c-.552 0-1-.447-1-1s.448-1 1-1c1.654 0 3-1.346 3-3s-1.346-3-3-3c-.243 0-.5.041-.81.13l-1.075.307-.185-1.103c-.326-1.932-1.978-3.334-3.93-3.334-2.206 0-4 1.794-4 4 0 .272.027.545.082.811l.244 1.199-1.42-.016c-1.009.006-1.906.903-1.906 2.006s.897 2 2 2c.552 0 1 .447 1 1s-.448 1-1 1c-2.206 0-4-1.794-4-4 0-1.861 1.277-3.429 3.001-3.874l-.001-.126c0-3.309 2.691-6 6-6 2.587 0 4.824 1.638 5.65 4.015 2.939-.244 5.35 2.113 5.35 4.985 0 2.757-2.243 5-5 5zM10.5 18l1-3 1 3c.184.553-.114 1.149-.667 1.333-.552.185-1.149-.114-1.333-.666-.075-.226-.07-.458 0-.667zM13.5 20l1-3 1 3c.184.553-.114 1.149-.667 1.333-.552.185-1.149-.114-1.333-.666-.075-.226-.07-.458 0-.667zM7.5 20l1-3 1 3c.184.553-.114 1.149-.667 1.333-.552.185-1.149-.114-1.333-.666-.075-.226-.07-.458 0-.667z"
					/>
				</svg>
			{/if}
			<div class="weather-mis">
				<span>{location}</span>
				<span class="description">{description}</span>
				<span class="">{speed}m/s</span>
			</div>
		</div>
		<div class="weather">
			<div class="temp">{temp} °C</div>
			<div class="humidity">{humidity} %</div>
		</div>
	</div>
{/if}

<style>
	.weather {
		display: flex;
		flex-direction: column;
		justify-content: center;

		height: 100%;
	}

	.widget-container {
		height: 100%;

		display: grid;
		grid-template-columns: 1fr 1.2fr;

		justify-items: center;
		align-items: center;

		padding: 18px;

		opacity: 0.7;
	}

	.icon {
		text-align: center;
	}

	svg {
		/* stroke: red; */
		/* fill: greenyellow; */
		height: 80px;
	}

	.weather-mis {
		font-size: 16px;
		font-weight: 600;
		opacity: 0.7;
	}

	.weather {
		font-size: 36px;
		font-weight: 600;
	}
</style>
