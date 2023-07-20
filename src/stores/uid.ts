import { browser } from '$app/env';
import { writable } from 'svelte/store';

// nipa_1234567890-utterance
const localUid = '';

const sessUid = browser ? window.localStorage.getItem('uid') ?? localUid:localUid;

const uid = writable<string>(sessUid);

uid.subscribe((val) => {
	if (browser) {      
		window.localStorage.setItem('uid', val);
	}
})
export default uid;
