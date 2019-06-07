<script>
  import ServerRow from './row.svelte';
  import { servers } from './store.js';

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
