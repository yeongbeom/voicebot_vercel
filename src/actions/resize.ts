export const resize = (node: any, mediaQueryString: string) => {
	const screenSize = window.matchMedia(mediaQueryString);

	const handleChange = () => {
		node.dispatchEvent(new CustomEvent('change', { detail: { matches: screenSize.matches } }));
	};

	screenSize.addEventListener('change', handleChange);

	return {
		destroy() {
			screenSize.removeEventListener('change', handleChange);
		}
	};
};
