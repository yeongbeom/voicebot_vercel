import { browser } from '$app/env';
import { writable } from 'svelte/store';

const localMikeTp = 'off';
const sessMikeTp = browser ? window.localStorage.getItem('mikeTp') ?? localMikeTp:localMikeTp;

const mikeTp = writable<string>(sessMikeTp);

mikeTp.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('mikeTp', value);
	}
});
export default mikeTp;