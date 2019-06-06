import { derived, writable } from 'svelte/store';

export let filters = writable({"0default": {"gametype": ["any"]}});