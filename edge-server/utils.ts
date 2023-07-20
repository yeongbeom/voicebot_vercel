export const wait = (ms = 1000) => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
};

export const toRgbValue = (red: number, green: number, blue: number) => {
	return red * 65536 + green * 255 + blue;
};
