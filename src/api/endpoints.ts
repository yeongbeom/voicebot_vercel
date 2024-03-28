// const gnictPort = '20080';
// const gnictHost = 'gnlabs.iptime.org';
// const ketiPort = '50443';
const ketiPort = '50032';
const ketiHost = 'ketiair.com';
// const ketiHost = '115.95.228.155';

const protocol = 'https';
const pathTalk = 'talk';
const pathOffer = 'offer';

export const endpoints = {
	offerMonitoring: `${protocol}://${ketiHost}:${ketiPort}/${pathOffer}`,
	offerEmpathy: `${protocol}://${ketiHost}:${ketiPort}/${pathOffer}`,
	talk: `${protocol}://${ketiHost}:${ketiPort}/${pathTalk}`,
	tts: 'https://kakaoi-newtone-openapi.kakao.com/v1/synthesize'
	// tts: 'https://bb2e0f69-c2be-4f37-ba6c-71806b9e9c9a.api.kr-central-1.kakaoi.io/ai/text-to-speech/fdb3e2003a6a4406b5e35dc7605c72ab'
};
