import { writable } from 'svelte/store';

export const servers = writable([]);
export const loading = writable(true);
export const pause = writable(false);

const PERIOD = 10000;

function serverListUpdater() {
  fetch("/serverlist")
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
