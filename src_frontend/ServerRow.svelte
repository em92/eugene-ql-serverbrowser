<script>
  import ServerDataLocation from './ServerDataLocation.svelte';
  import ServerDataGametype from './ServerDataGametype.svelte';
  import ServerDataPlayerCount from './ServerDataPlayerCount.svelte';
  import ServerDataRank from './ServerDataRank.svelte';
  import ServerDataScore from './ServerDataScore.svelte';
  import ServerDataIsDedicated from './ServerDataIsDedicated.svelte';
  import ServerDataIsPrivate from './ServerDataIsPrivate.svelte';
  import ServerDataIsWarmup from './ServerDataIsWarmup.svelte';
  import { chosenServerAddress } from './server-details-store.js';
  export let server = {
    "dedicated": true, 
    "host_address": "139.99.5.168:27960", 
    "is_promoted": 0, 
    "gameinfo": {
      "rating_type": null, 
      "timelimit": 0, 
      "rating_avg": null, 
      "teamsize": 0, 
      "sv_maxclients": 10, 
      "is_team_game": true, 
      "mapname": "terminatria", 
      "players": [], 
      "gt_short": "ca", 
      "g_levelstarttime": 1557820605, 
      "rating_min": 0, 
      "g_instagib": 0, 
      "g_bluescore": 0, 
      "g_gamestate": "PRE_GAME", 
      "g_factory": "ca", 
      "bots": [], 
      "rating_max": 9999, 
      "g_factorytitle": "Clan Arena", 
      "g_redscore": 0, 
      "g_gametype": 4
    }, 
    "tags": [
      "clanarena", 
      "quake vql duel asia australia singapore"
    ], 
    "vac": true, 
    "is_rated": false, 
    "host_name": "QQ test", 
    "password": false, 
    "qlstats": {
      "msg": "Server is not being tracked (cached)", 
      "ok": false
    }, 
    "location": {
      "city": "Hot Springs", 
      "region": "NA", 
      "country": "US"
    }
  };

  function handleClick() {
    chosenServerAddress.set(server.host_address);
  }
</script>

<tr on:click={handleClick}>
  <ServerDataLocation geo={server.location} />
  <ServerDataGametype server={server} />
  <td>{server.host_name}</td>
  <td>{server.gameinfo.mapname}</td>
  <ServerDataPlayerCount server={server} />
  <ServerDataScore server={server} />
  <ServerDataIsWarmup server={server} />
  <ServerDataIsPrivate server={server} />
  <ServerDataIsDedicated server={server} />
  <ServerDataRank server={server} />
  <td><a href="steam://connect/{server.host_address}" class="btn btn-primary btn-xs">connect</a></td>
</tr>