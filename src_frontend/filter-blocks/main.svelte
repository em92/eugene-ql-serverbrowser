<script>
  import { filters } from "./store.js";
  import RawFiltersText from "./raw.svelte";
  import FilterBlock from "./block.svelte";

  let isShowingRawFilter = true;
  let isShowingFilterBlocks = true;
  let filterIds = Object.keys($filters);
  filterIds.sort();

/*
    var filter_ids = Object.keys(this.state.filterData);
    filter_ids.sort();
    var render_result = filter_ids.map( filter_id => {
      return (<div className="filter-block-wrapper" key={filter_id} style={{display: this.state.hidden ? "none" : "block"}}>
        <FilterBlock
          id={filter_id}
          parentCallback={self.onFilterItemBlockChange}
          filterData={this.state.filterData[filter_id]}
          key={filter_id}
        />
        <div onClick={this.onRemoveFilterClickHandler(filter_id)} className="filter-block-close"></div>
      </div>)
    });
    var filter_cnt = render_result.length;
    if (render_result.length == 0) {
      render_result = <div className="no-filters">No filters defined. Press &quot;Add filter&quot; to add one</div>;
    }
    var filter_controls = (<div className="filter-controls">
      <a onClick={this.onShowHideOptionsClick} className="btn btn-primary btn-xs">{this.state.hidden ? "Show" : "Hide"} filters ({filter_cnt})</a>
      <a onClick={this.onAddFilterClick} className="btn btn-primary btn-xs">Add filter</a>
      <a onClick={this.exportFilterData} className="btn btn-primary btn-xs">Export</a>
    </div>);
    */
</script>

{#if isShowingRawFilter}
  <RawFiltersText on:click={() => {isShowingRawFilter = !isShowingRawFilter}} />
{:else}
  <div class="filter-block-wrapper">{#each filterIds as id}
    <FilterBlock id={id} />
  {/each}</div>
{/if}