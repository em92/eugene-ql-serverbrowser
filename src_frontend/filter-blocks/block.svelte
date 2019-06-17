<script>

  import { filters } from "./store.js";
  import { FILTER_ITEM_PROMPTS } from "../global.js";

  import Country from "./country.svelte";
  import Region from "./region.svelte";
  import Factory from "./factory.svelte";
  import Gamestate from "./gamestate.svelte";
  import Gametype from "./gametype.svelte";
  import Mapname from "./mapname.svelte";
  import Tags from "./tags.svelte";
  import Turbo from "./turbo.svelte";
  import Accessibility from "./accessibility.svelte";
  import Vampiric from "./vampiric.svelte";
  import MinRating from "./min-rating.svelte";
  import MaxRating from "./max-rating.svelte";
  import MinPlayers from "./min-players.svelte";

  export let id = "0default";
  $: filterItems = Object.keys($filters[id]).map( key => {
    return {'key': key, 'value': $filters[id][key]}
  });
  $: remainingFilters = Object.keys(FILTER_ITEM_PROMPTS).filter(key => {
    return (typeof($filters[id][key]) == "undefined");
  });

  let value = "none";

  function createFilterItem(event) {
    filters.update( data => {
      data[id][event.target.value] = [];
      event.target.value = "none";
      return data;
    });
  }
</script>

<style>
  .filter-block {
    background-color: #ccc;
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .filter-block-wrapper:not(:first-child) {
    margin-top: 20px;
  }

  .filter-block-close {
    background-image: url("/images/close.png");
    position: absolute;
    top: -10px;
    right: -10px;
    z-index: 10;

  }
</style>

<div class="filter-block-wrapper">
<div class="filter-block">
  {#each filterItems as {key, value}}
    {#if key == 'gametype'}
      <Gametype filterId={id} value={value} />
    {:else if key == 'turbo'}
      <Turbo filterId={id} value={value} />
    {:else if key == 'tags'}
      <Tags filterId={id} value={value} />
    {:else if key == 'country'}
      <Country filterId={id} value={value} />
    {:else if key == 'region'}
      <Region filterId={id} value={value} />
    {:else if key == 'private'}
      <Accessibility filterId={id} value={value} />
    {:else if key == 'mapname'}
      <Mapname filterId={id} value={value} />
    {:else if key == 'g_factory'}
      <Factory filterId={id} value={value} />
    {:else if key == 'vampiric'}
      <Vampiric filterId={id} value={value} />
    {:else if key == 'g_gamestate'}
      <Gamestate filterId={id} value={value} />
    {:else if key == 'rating_min'}
      <MinRating filterId={id} value={value} />
    {:else if key == 'rating_max'}
      <MaxRating filterId={id} value={value} />
    {:else if key == 'min_players'}
      <MinPlayers filterId={id} value={value} />
    {/if}
  {/each}
  {#if remainingFilters.length > 0}
    <div class="filter-item">
      <div class="filter-item-left">Add filter:</div>
      <div class="filter-item-right"><select {value} on:change={createFilterItem}>
        <option value="none" disabled={true}></option>
        {#each remainingFilters as key}
          <option value="{key}">{FILTER_ITEM_PROMPTS[key]}</option>
        {/each}
      </select></div>  
    </div>
  {/if}
</div>
<div role="button" class="filter-block-close"></div>
</div>