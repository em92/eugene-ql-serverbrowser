<script>
  import { filters } from "./store.js";
  import { FILTER_ITEM_PROMPTS } from "../global.js";

  export let name = "";
  export let prompt = "Prompt";
  export let filterId = "0default";
  
  if (name && FILTER_ITEM_PROMPTS[name]) {
    prompt = FILTER_ITEM_PROMPTS[name];
  }

  function removeFilterItem() {
    filters.update( data => {
      delete data[filterId][name];
      return data;
    });
  }
</script>

<div class="filter-item-wrapper">
  <div class="filter-item">
    <div class="filter-item-left">{prompt}</div>
    <div class="filter-item-right">
      <slot></slot>
    </div>
  </div>
  {#if name}
    <div role="button" on:click={removeFilterItem} class="filter-item-close"></div>
  {/if}
</div>
