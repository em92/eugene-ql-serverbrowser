import { writable } from 'svelte/store';
import { cleanFilters as filters } from './filter-blocks/store.js';

export const servers = writable([]);
export const loading = writable(true);
export const pause = writable(false);

let encodedFilterData = "";
const PERIOD = 10000;

filters.subscribe( data => {
  encodedFilterData = window.btoa(JSON.stringify(data));
  serverListUpdater();
});

function serverListUpdater() {
  fetch("/serverlist/" + encodedFilterData)
  .then( response => response.json())
  .then( data => {
    servers.set(data.servers);
    loading.set(false);
  });
}

let timer = null;

pause.subscribe(value => {
  if (value == true) {
    clearInterval(timer);
  } else {
    loading.set(true);
    serverListUpdater();
    timer = setInterval(serverListUpdater, PERIOD)
  }
});
