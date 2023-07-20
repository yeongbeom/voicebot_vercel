export const dict = {
	Seoul: '서울',
	'Seongnam-si': '성남시',
	Busan: '부산',
	Gwangju: '광주',

	Clear: '맑음',
	Clouds: '흐림',
	Rain: '비'
};

export const translate = (eng: keyof typeof dict): string => {
	return dict[eng];
};
