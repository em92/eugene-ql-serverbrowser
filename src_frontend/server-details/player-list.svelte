<script>
  import { serverDetails } from "./store.js";
  import PlayerListCommon from "./player-list-common.svelte";
  import PlayerListQLStats from "./player-list-qlstats.svelte";
  import PlayerListRace from "./player-list-race.svelte";

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
  {#if $serverDetails.gameinfo.players.length == 0 && $serverDetails.gameinfo.bots.length == 0}
    <div class="emptyserver">empty server</div>
  {:else if $serverDetails.gameinfo.g_gametype == 2}
    <PlayerListRace server={$serverDetails} />
  {:else if $serverDetails.qlstats.ok}
    <PlayerListQLStats server={$serverDetails} />
  {:else}
    <PlayerListCommon server={$serverDetails} />
  {/if}
</div>