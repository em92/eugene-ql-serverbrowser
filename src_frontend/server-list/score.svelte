<script>
  export let server = {
    gameinfo: {
      g_gamestate: "IN_PROGRESS",
      is_team_game: false,
      g_gametype: 0,
      g_redscore: 1,
      g_bluescore: 2,
      players: [{ // sorted by score desc
        name: "Player1",
        score: 10,
      }, {
        name: "Player2",
        score: 1,
      }]
    }
  };
  /** @todo Используемые стили white-space: pre перенеси */
</script>

<td>
  {#if server.gameinfo.g_gamestate == 'PRE_GAME'}
    <!-- -->
  {:else}
    {#if server.gameinfo.is_team_game}
      <span style="white-space: pre">
        <span class="qc1">{server.gameinfo.g_redscore}</span>
        <span> : </span>
        <span class="qc4">{server.gameinfo.g_bluescore}</span>
      </span>
    {:else if server.gameinfo.g_gametype == 0 && server.gameinfo.players.length > 1}
      <span style="white-space: pre">
        <span>{server.gameinfo.players[0].score}</span>
        <span> : </span>
        <span>{server.gameinfo.players[1].score}</span>
      </span>
    {/if}
  {/if}
</td>