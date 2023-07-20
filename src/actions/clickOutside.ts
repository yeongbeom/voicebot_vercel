/** Dispatch event on click outside of node */
export const clickOutside = (node: any) => {
	const handleClick = (event: Event) => {
		if (
			node &&
			!node.contains(event.target) &&
			!event.defaultPrevented &&
			!(event.target instanceof HTMLButtonElement) &&
			!(event.target instanceof HTMLUnknownElement)
		) {
			node.dispatchEvent(new CustomEvent('click_outside'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
