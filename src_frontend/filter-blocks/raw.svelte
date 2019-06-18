<script>
  import { filters } from "./store.js";
  import { isValidFilterDataString } from '../global.js';
  let stringifiedFilters = JSON.stringify($filters, null, 2);
  export let toggleCallback = function() {};
</script>

<div class="filter-controls">
  {#if isValidFilterDataString(stringifiedFilters)}
    <button class="btn btn-primary btn-xs" on:click={() => {filters.set(JSON.parse(stringifiedFilters)); toggleCallback()}}>Import</button>
  {:else}
    <button class="btn btn-danger btn-xs">Bad filter</button>
  {/if}
  <button on:click={toggleCallback} class="btn btn-primary btn-xs">Done</button>
</div>
<textarea bind:value={stringifiedFilters} rows={stringifiedFilters.split("\n").length-1} />