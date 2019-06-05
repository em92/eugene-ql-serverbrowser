import { derived, writable } from 'svelte/store';
import { servers } from '../server-list-store.js';

let cache = {};

const serversAsDict = derived(
  servers, $servers => {
    let result = {};
    for(let i in $servers) {
      let server = $servers[i];
      result[server.host_address] = server;
    }
    cache = {};
    return result;
  }
);

export const chosenServerAddress = writable(null);
export const serverDetails = derived(
  [chosenServerAddress, serversAsDict],
  ([$chosenServerAddress, $serversAsDict], set) => {

    function updateServer(server, newData) {
      let data = Object.assign({}, newData, server);
      set(data);
    }

    function fetchQLStatsData(server) {
      if (server.gameinfo.players.length == 0) {
        updateServer(server, {
          qlstats: {ok: true, players: []},
          loading: false
        });
        return;
      };

      if (cache[server.host_address]) {
        updateServer(server, {
          qlstats: cache[server.host_address],
          loading: false
        });
        return;
      }

      updateServer(server, {loading: true});

      fetch("/qlstats/" + server.host_address)
      .then( response => response.json())
      .then( data => {
        cache[server.host_address] = data;
        updateServer(server, {
          qlstats: data,
          loading: false
        });
      })
      .catch( error => {
        console.error(error);
        updateServer(server, {
          loading: false
        });
      })
    }

    let server = $serversAsDict[$chosenServerAddress];
    if (!server) {
      set(null);
      return;
    }

    if (server.qlstats) {
      updateServer(server, {loading: false});
    } else if (!server.loading) {
      fetchQLStatsData(server);
    }
  }
);
