import { browser } from '$app/env';
import { writable } from 'svelte/store';

// nipa_1234567890-utterance
const localUid = '';

const newId = new Uint32Array(1);
crypto.getRandomValues(newId);
const newUid = "nipa_" + newId[0] + "-utterance";  

const sessUid = browser ? window.localStorage.getItem('uid') ?? localUid:newUid;

const uid = writable<string>(sessUid);

uid.subscribe((val) => {
	if (browser) {      
		window.localStorage.setItem('uid', val);
	}
})
export default uid;
