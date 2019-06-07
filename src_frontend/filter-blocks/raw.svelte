<script>
  import { filters } from "./store.js";
  import { isValidFilterDataString } from '../global.js';
  let stringifiedFilters = JSON.stringify($filters, null, 2);
</script>

<div class="filter-controls">
  {#if isValidFilterDataString(stringifiedFilters)}
    <button class="btn btn-primary btn-xs">Import</button>
  {:else}
    <button class="btn btn-danger btn-xs">Bad filter</button>
  {/if}
  <button on:click class="btn btn-primary btn-xs">Done</button>
</div>
<textarea bind:value={stringifiedFilters} rows={stringifiedFilters.split("\n").length-1} />