<script>
  import { serverDetails, chosenServerAddress } from "./store.js";
  import PlayerList from "./player-list.svelte";
  import Score from "./score.svelte"
  import { GAMETYPES } from "../global.js";

  let isShowingTags = false;
  let players = [];
  serverDetails.subscribe( data => {
    if (data == null) return;
    players = data.gameinfo.players.concat(data.gameinfo.bots.map( function(p) {
      return {
        "score": p.score,
        "name": p.name
      };
    }));

    players.sort( function(a, b) {
      return b.score - a.score;
    });
  });

</script>

<style>
  .serverinfo {
    padding: 2px;
    position: fixed;
    left: 0;
    top: 0;
    background-color: white;
    border: 1px solid black;
  }

  .serverinfo .emptyserver {
    text-align: center;
  }

  .serverinfo-buttons {
    width: 100%;
    text-align: center;
  }

  .loading {
    text-align: center;
  }
</style>

{#if $serverDetails}
<div class="serverinfo">
  <ul>
    <li>Gametype: {GAMETYPES[$serverDetails.gameinfo.g_gametype + 100*$serverDetails.gameinfo.g_instagib]}</li>
    <li>Gamestate: {{'PRE_GAME': 'Warmup', 'IN_PROGRESS': 'In progress'}[$serverDetails.gameinfo.g_gamestate]}</li>
    <li>Map: {$serverDetails.gameinfo.mapname}</li>
    <li>Address: {$serverDetails.host_address}</li>
    <Score server={$serverDetails} />
  </ul>

  <div class="serverinfo-buttons">
    <a href={"steam://connect/" +$serverDetails.host_address} class="btn btn-primary btn-xs">connect</a>
    &nbsp;
    <button on:click={() => isShowingTags = !isShowingTags} class="btn btn-primary btn-xs">
      {isShowingTags ? 'hide' : 'show'} tags
    </button>
    &nbsp;
    <button on:click={() => chosenServerAddress.set(null)} class="btn btn-primary btn-xs">close</button>
  </div>

  {#if isShowingTags}
    <p>{#each $serverDetails.tags as tag}
      <span>{tag}&nbsp;</span>
    {/each}</p>
  {/if}

  {#if players.length == 0}
    <div class="emptyserver">empty server</div>
  {:else if $serverDetails.loading}
    <div class="loading">
      <img alt="Loading..." src="/images/loading.gif" />
    </div>
  {:else}
    <PlayerList server={$serverDetails} />
  {/if}
</div>

{/if}