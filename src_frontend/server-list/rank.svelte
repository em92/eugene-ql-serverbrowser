
<script>
  export let server = {
    is_rated: true,
    rank: 1,
    gameinfo: {
      players: {
        length: 1
      }
    }
  };
</script>

<td>
{#if server.is_rated == false || server.rank == -1}
  <img alt="unrated" src="/images/unrated.png" />
{:else if typeof(server.rank) == "undefined" || server.gameinfo.players.length == 0}
  <!-- -->
{:else}
  <img alt="rank{server.rank}" src="/images/rank{server.rank}.png" />
{/if}
</td>
