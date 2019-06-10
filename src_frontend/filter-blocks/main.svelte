<script>
  import { filters } from "./store.js";
  import RawFiltersText from "./raw.svelte";
  import FilterBlock from "./block.svelte";
  import FilterControls from "./filter-controls.svelte";

  let isShowingRawFilter = true;
  let isShowingFilterBlocks = true;
  let filterIds = Object.keys($filters);
  filterIds.sort();
  let filterCnt = filterIds.length;

  let toggleRawFilter = () => {isShowingRawFilter = !isShowingRawFilter};
  let toggleFilters = () => {isShowingFilterBlocks = !isShowingFilterBlocks};
</script>

{#if isShowingRawFilter}
  <RawFiltersText on:click={toggleRawFilter} />
{:else}
  <FilterControls
    onExportClick={toggleRawFilter}
    onShowHideOptionsClick={toggleFilters}
    isShowingFilterBlocks={isShowingFilterBlocks}
  />
  {#if isShowingFilterBlocks}
    <div class="filter-block-wrapper">{#each filterIds as id}
      <FilterBlock id={id} />
    {/each}</div>
    <FilterControls
      onExportClick={toggleRawFilter}
      onShowHideOptionsClick={toggleFilters}
      isShowingFilterBlocks={isShowingFilterBlocks}
    />
  {/if}
{/if}