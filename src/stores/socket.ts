import { writable } from 'svelte/store';

export const socketStatus = writable('init');

export const yeelight = writable('off');
