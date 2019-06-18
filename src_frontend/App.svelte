<script>
  import ServerList from './server-list/main.svelte';
  import ServerDetails from './server-details/main.svelte';
  import FilterBlocks from './filter-blocks/main.svelte';
  import SteamAccount from './steam-account/main.svelte';

  let isFetchSupported = typeof(window.fetch) !== "undefined";
</script>

{#if isFetchSupported}
  <FilterBlocks />
  <ServerList />
  <ServerDetails />
  <SteamAccount />
{:else}
  <div class="startup-error">
    Your browser is not supported :(
  </div>
{/if}