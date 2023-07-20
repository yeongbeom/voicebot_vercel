/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		user?: { emergencyMobile: string };
	}
	// interface Platform {}
	interface Session {
		user?: { emergencyMobile: string };
	}
	// interface Stuff {}
}
