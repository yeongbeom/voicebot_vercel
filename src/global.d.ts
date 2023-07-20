type EmpathyRes = {
	emotion: string;
	text: string;
};

type User = {
	emergencyMobile: string;
};

declare namespace svelte.JSX {
	interface HTMLProps<T> {
		onclick_outside?: (event: CustomEvent) => void;
	}
}

declare module 'svelte-carousel';
