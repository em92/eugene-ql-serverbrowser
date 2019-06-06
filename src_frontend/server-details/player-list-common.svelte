<script>
  import QLNickname from "../ql-nickname.svelte";
  export let server = {
    gameinfo: {
      players: [{
        name: "Player1",
        score: 10,
      }, {
        name: "Player2",
        score: 1,
      }],
      bots: [{
        name: "Bot1",
        score: 20,
      }]
    }
  };

  let players = server.gameinfo.players.concat(server.gameinfo.bots.map( function(p) {
    return {
      "score": p.score,
      "name": p.name
    };
  }));

  players.sort( function(a, b) {
    return b.score - a.score;
  });

</script>

<table>
  <thead><tr>
    <th>Nick</th>
    <th style='width: "50px'>Score</th>
  </tr></thead>
  <tbody>
    {#each players as { name, score }}
      <tr>
        <td><QLNickname nickname={name} /></td>
        <td>{score}</td>
      </tr>
    {/each}
  </tbody>
</table>

