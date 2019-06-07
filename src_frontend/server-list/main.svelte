<script>
  import ServerRow from './row.svelte';
  import { servers, loading, pause } from './store.js';

</script>

<style>
  table :global(tr) {
    cursor: pointer;
  }

  table :global(td) {
    padding-left: 5px;
    padding-right: 5px;
    height: 30px;
  }

  .message {
    background-color: #ccc;
    width: 100%;
    overflow:auto;
    padding: 10px;
    text-align: center;
  }
</style>


{#if $loading}
  <div class="message">Loading...</div>
{:else if $pause}
  <div class="message">Zzzzzz...</div>
{:else if $servers.length == 0}
  <div class="message">No results</div>
{:else}
  <table>
    <thead><tr>
      <th>Location</th>
      <th>Gametype</th>
      <th>Hostname</th>
      <th>Arena</th>
      <th>Players</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr></thead>
    <tbody>{#each $servers as server}
      <ServerRow server={server} />
    {/each}</tbody>
  </table>
{/if}