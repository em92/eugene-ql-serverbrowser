<script>
  let noop = function() {};
  export let onShowHideOptionsClick = noop;
  export let onAddFilterClick = noop;
  export let onExportClick = noop;
  export let isShowingFilterBlocks = true;
  export let filterCnt = 1;
</script>

<style>
  .filter-controls {
    padding: 20px;
  }
</style>

<div class="filter-controls">
  <button on:click={onShowHideOptionsClick} class="btn btn-primary btn-xs">{isShowingFilterBlocks ? "Hide" : "Show"} filters ({filterCnt})</button>
  <button on:click={onAddFilterClick} class="btn btn-primary btn-xs">Add filter</button>
  <button on:click={onExportClick} class="btn btn-primary btn-xs">Export</button>
</div>
