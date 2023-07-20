import { writable } from 'svelte/store';

export const alarm = writable({
	set: false,
	hour: 6,
	minute: 30,
	ampm: '오후'
});

export const ring = writable(false);

export const currentTime = writable('0시 0분 0초 오후');
