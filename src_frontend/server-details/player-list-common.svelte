<script>
  import { serverDetails } from "./store.js";

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
  .emptyserver {
    text-align: center;
  }

  tr {background: #000}
  tr:hover {background: #222}

  th {
    background-color: white;
    color: black;
  }

  td {
    color: white;
  }
</style>

{#if players.length == 0}
  <div class="emptyserver">empty server</div>
{:else}
  <table>
    <thead><tr>
      <th>Nick</th>
      <th style='width: "50px'>Score</th>
    </tr></thead>
    <tbody>
      {#each players as { name, score }}
        <tr>
          <td>{name}</td>
          <td>{score}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

