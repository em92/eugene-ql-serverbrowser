<script>
  import QLNickname from "../ql-nickname.svelte";
  import { serverDetails } from "./store.js";
  import { derived } from 'svelte/store';

  const players = derived(
    serverDetails, server => {

      let result = server.gameinfo.players.concat(server.gameinfo.bots.map( function(p) {
        return {
          "score": p.score,
          "name": p.name
        };
      }));

      result.sort( function(a, b) {
        return b.score - a.score;
      });

      return result;
    }
  );

</script>

<table>
  <thead><tr>
    <th>Nick</th>
    <th style='width: "50px'>Score</th>
  </tr></thead>
  <tbody>
    {#each $players as { name, score }(name)}
      <tr>
        <td><QLNickname nickname={name} /></td>
        <td>{score}</td>
      </tr>
    {/each}
  </tbody>
</table>

