import { browser } from '$app/env';
import { writable } from 'svelte/store';

// nipa_cha_1234567890-utterance
const localUid = '';

const curDate = new Date;
const timeInfo = (curDate.getMonth() + 1).toString()+curDate.getDate() + "_" 
				+ curDate.getHours() + curDate.getMinutes() + curDate.getSeconds();
const newId = new Uint32Array(1);
crypto.getRandomValues(newId);
const newUid = "nipa_cha_" + timeInfo + "_" + newId[0] + "-utterance";

let sessUid = browser ? window.localStorage.getItem('uid') ?? localUid:newUid;

if (sessUid == '') {
	sessUid = newUid
} 

const uid = writable<string>(sessUid);
// console.log('sessUid >> ', sessUid);
// console.log('uid >> ', uid);
uid.subscribe((val) => {
	if (browser) {      
		window.localStorage.setItem('uid', val);
	}
})
export default uid;
