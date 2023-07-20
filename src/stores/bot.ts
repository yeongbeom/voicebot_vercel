import { readable, writable } from 'svelte/store';

export const heard = writable('');
export const say = writable('');

export const currentExpression = writable('neutral');

export const isTalking = writable(false);

export const currentStatus = writable('init');

export const expression = readable({
	neutral: 'neutral',
	happiness: 'happiness',
	happy: 'happiness',
	disgust: 'disgust',
	surprise: 'surprise',
	anger: 'anger',
	sadness: 'sadness',
	fear: 'fear',
	worry: 'worry',
	contempt: 'contempt',
	listen: 'listen',
	think: 'think'
});

export const status = readable({
	init: 'init',
	idle: 'idle',
	listening: 'listening',
	thinking: 'thinking',
	talking: 'talking'
});
