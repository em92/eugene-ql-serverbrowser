<script>
  import ServerRow from './ServerRow.svelte';
  import { servers } from './server-list-store.js';

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
  {#each $servers as server}
    <ServerRow server={server} />
  {/each}
</table>
