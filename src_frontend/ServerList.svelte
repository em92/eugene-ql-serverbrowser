<script>
  import ServerRow from './ServerRow.svelte';

  let servers = [];

  fetch("/serverlist")
  .then( response => response.json())
  .then( data => {
    servers = data.servers;
  });

  function showServerInfo(server) {
    console.log("hey!", server);
  }

  /** @todo подумать над. Может быть можно обойтись без onServerRowClickCallback
   * https://svelte.dev/examples#writable-stores
   */
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
</style>

<table>
  {#each servers as server}
    <ServerRow server={server} onServerRowClickCallback={showServerInfo} />
  {/each}
</table>
