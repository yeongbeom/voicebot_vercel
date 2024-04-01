import { browser } from '$app/env';
import { writable } from 'svelte/store';

// web_1234567890-utterance
const localUid = '';

const curDate = new Date;
const month = String(curDate.getMonth() + 1).padStart(2, '0')
const date = String(curDate.getDate()).padStart(2, '0')
const hours = String(curDate.getHours()).padStart(2, '0')
const minutes = String(curDate.getMinutes()).padStart(2, '0')
const seconds = String(curDate.getSeconds()).padStart(2, '0')

const timeInfo = month + date + "_" + hours + minutes + seconds;
const newId = new Uint32Array(1);
crypto.getRandomValues(newId);
const newUid = "web_" + timeInfo + "_" + newId[0] + "-utterance";

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
