<script>
  import { filters, filterIds } from "./store.js";
  import RawFiltersText from "./raw.svelte";
  import FilterBlock from "./block.svelte";
  import FilterControls from "./filter-controls.svelte";

  let isShowingRawFilter = false;
  let isShowingFilterBlocks = true;

  let toggleRawFilter = () => {isShowingRawFilter = !isShowingRawFilter};
  let toggleFilters = () => {isShowingFilterBlocks = !isShowingFilterBlocks};
  let addFilterCallback = () => {
    let id = (new Date().getTime() + Math.random()).toString();
    isShowingRawFilter = false;
    filters.update( data => {
      data[id] = {};
      return data;
    });
  };
</script>

{#if isShowingRawFilter}
  <RawFiltersText on:click={toggleRawFilter} />
{:else}
  <FilterControls
    onAddFilterClick={addFilterCallback}
    onExportClick={toggleRawFilter}
    onShowHideOptionsClick={toggleFilters}
    isShowingFilterBlocks={isShowingFilterBlocks}
  />
  {#if isShowingFilterBlocks || $filterIds.length == 0}
    <div class="filter-block-wrapper">{#each $filterIds as id}
      <FilterBlock id={id} />
    {/each}</div>
    <FilterControls
      onAddFilterClick={addFilterCallback}
      onExportClick={toggleRawFilter}
      onShowHideOptionsClick={toggleFilters}
      isShowingFilterBlocks={isShowingFilterBlocks}
    />
  {/if}
{/if}