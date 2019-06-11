<script>

  import { filters } from "./store.js";
  import { FILTER_ITEM_PROMPTS } from "../global.js";

  import Gametype from "./gametype.svelte";
  import Tags from "./tags.svelte";
  import Turbo from "./turbo.svelte";

  export let id = "0default";
  let filterItems = Object.keys($filters[id]).map( key => {
    return {'key': key, 'value': $filters[id][key]}
  });
  let remainingFilters = Object.keys(FILTER_ITEM_PROMPTS).filter(key => {
    return (typeof($filters[id][key]) == "undefined");
  });

</script>

<!--
<style>
  .filter-block {
    /*
    background-color: #ccc;
    width: 100%;
    overflow:auto;
    */
    background-color: black; color: white;
  }

  .filter-item-close {
    background-image: url("/images/close.png");
    display: block;
    float: left;
    height: 19px;
    left: 6px;
    position: relative;
    top: 9px;
    width: 20px;
    cursor: pointer;
  }
</style>-->

<div class="filter-block">
  {#each filterItems as {key, value}}
    {#if key == 'gametype'}
      <Gametype filterId={id} value={value} />
    {:else if key == 'turbo'}
      <Turbo filterId={id} value={value} />
    {:else if key == 'tags'}
      <Tags filterId={id} value={value} />
    {/if}
  {/each}
  {#if remainingFilters.length > 0}
    <div class="filter-item">
      <div class="filter-item-left">Add filter:</div>
      <div class="filter-item-right"><select value="none" onChange={this.createFilterItem}> <!-- TODO: change it -->
        <option value="none" disabled={true}></option>
        {#each remainingFilters as key}
          <option value="{key}">{FILTER_ITEM_PROMPTS[key]}</option>
        {/each}
      </select></div>  
    </div>
  {/if}
</div>
<div role="button" class="filter-block-close"></div>
