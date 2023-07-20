type TtsApiKeyType = {
	[key: number]: string;
};

export const ttsApiKey: TtsApiKeyType = {
	0: import.meta.env.VITE_TTS_API_KEY_0,
	1: import.meta.env.VITE_TTS_API_KEY_1,
	2: import.meta.env.VITE_TTS_API_KEY_2
};

export const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
