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
</script>

{#if server.gameinfo.players.length == 0}
  <!-- must have players -->
{:else if server.gameinfo.is_team_game == false}
  <!-- showing team scores only for team-based gametypes (RR - is not team-based) -->
{:else if server.gameinfo.g_gamestate == "PRE_GAME"}
  <!-- not showing scores on warmup -->
{:else}
  <li>
    Score: <span class="qc1">{server.gameinfo.g_redscore}</span> &ndash; <span class="qc4">{server.gameinfo.g_bluescore}</span>
  </li>
{/if}