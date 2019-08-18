<script>
  import QLNickname from "../ql-nickname.svelte";
  import { serverDetails } from "./store.js";
  import { derived } from 'svelte/store';

  const players = derived(
    serverDetails, server => {
      if (!server) return [];
      return server.gameinfo.players;
    }
  );

</script>

<table>
  <thead><tr>
    <th>Nick</th>
  </tr></thead>
  <tbody>
    {#each $players as { name, score }(name)}
      <tr>
        <td><QLNickname nickname={name} /></td>
      </tr>
    {/each}
  </tbody>
</table>
