<script>
  import ServerRow from './ServerRow.svelte';

  let servers = [];

  fetch("/serverlist")
  .then( response => response.json())
  .then( data => {
    servers = data.servers;
  });
</script>

<table>
  {#each servers as server}
    <ServerRow server={server} />
  {/each}
</table>
