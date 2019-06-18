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

  let players = server.gameinfo.players;

</script>

<table>
  <thead><tr>
    <th>Nick</th>
  </tr></thead>
  <tbody>
    {#each players as { name, score }}
      <tr>
        <td><QLNickname nickname={name} /></td>
      </tr>
    {/each}
  </tbody>
</table>