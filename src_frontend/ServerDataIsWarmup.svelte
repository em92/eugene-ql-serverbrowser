<script>
  export let server = {
    tags: ["minqlx"],
    gameinfo: {
      g_gamestate: 'PRE_GAME',
      g_gametype: 1,
    }
  };
</script>

<td>
  {#if server.gameinfo.g_gamestate == 'PRE_GAME' && !( server.gameinfo.g_gametype == 2 && server.tags.indexOf("minqlx") > -1 )}
    <img alt="unrated" src="/images/warmup.png" />
  {/if}
</td>
