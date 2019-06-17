import { writable, readable, derived } from 'svelte/store';
import { cleanFilters as filters } from '../filter-blocks/store.js';

export const loading = writable(true);
export const pause = writable(true);

const time = readable(new Date(), set => {
	const interval = setInterval(() => {
		set(new Date());
	}, 10000);

	return () => clearInterval(interval);
});

export const servers = derived(
  [filters, pause, time],
  ([$filters, $pause, $time], set) => {
    if ($pause) return;

    let encodedFilterData = window.btoa(JSON.stringify($filters));
    fetch("/serverlist/" + encodedFilterData)
    .then( response => response.json())
    .then( data => {
      set(data.servers);
      loading.set(false);
    });
  }
)
// TODO: added error state
