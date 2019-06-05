import { derived, writable } from 'svelte/store';
import { servers } from '../server-list-store.js';

export const chosenServerAddress = writable(null);
export const serverDetails = derived(
  [chosenServerAddress, servers],
  ([$chosenServerAddress, $servers], set) => {
    for(let i in $servers) {
      let server = $servers[i];
      if (server.host_address == $chosenServerAddress) {
        set(server);
        return;
      }
    }
    set(null);
  }
);