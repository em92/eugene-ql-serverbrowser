<script>
  import PlayerListCommon from "./player-list-common.svelte";
  import PlayerListQLStats from "./player-list-qlstats.svelte";
  import PlayerListRace from "./player-list-race.svelte";

  export let server = {};
</script>

<style>
  .emptyserver {
    text-align: center;
  }

  .playerlist :global(tr) {background: #000}
  .playerlist :global(tr):hover {background: #222}

  .playerlist :global(th) {
    background-color: white;
    color: black;
  }

  .playerlist :global(td) {
    color: white;
  }
</style>

<div class="playerlist">
  {#if server.gameinfo.players.length == 0 && server.gameinfo.bots.length == 0}
    <div class="emptyserver">empty server</div>
  {:else if server.gameinfo.g_gametype == 2}
    <PlayerListRace />
  {:else if server.qlstats.ok}
    <PlayerListQLStats />
  {:else}
    <PlayerListCommon />
  {/if}
</div>