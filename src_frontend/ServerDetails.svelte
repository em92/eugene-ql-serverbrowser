<script>
  import { serverDetails } from "./server-details-store.js";

  let players = [];
  serverDetails.subscribe( data => {
    console.log("sss", data);
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

  .serverinfo .closeblock {
    background-image: url("/images/close.png");
    position: absolute;
    bottom: -10px;
    right: -10px;
    width: 20px;
    height: 19px;
    cursor: pointer;
  }

  .serverinfo tr {background: #000}
  .serverinfo tr:hover {background: #222}

  .serverinfo th {
    background-color: white;
    color: black;
  }

  .serverinfo td {
    color: white;
  }
</style>

{#if $serverDetails}
<table class="serverinfo">
  <thead><tr>
    <th>Nick</th>
    <th style='width: "50px'>Score</th>
  </tr></thead>
  <tbody>
    {#each players as { name, score }}
      <tr>
        <td>{name}</td>
        <td>{score}</td>
      </tr>)
    {/each}
  </tbody>
</table>
{/if}