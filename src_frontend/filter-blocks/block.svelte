<script>

  import { filters } from "./store.js";
  import { FILTER_ITEM_PROMPTS } from "../global.js";

  import Tags from "./tags.svelte";
  import Turbo from "./turbo.svelte";

  export let id = "0default";
  let filter_items = Object.keys($filters[id]).map( key => {
    return {'key': key, 'value': $filters[id][key]}
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
  {#each filter_items as {key, value}}
    {#if key == 'gametype'}
      <!-- GAMETYPE: bla bla bla-->
    {:else if key == 'turbo'}
      <Turbo filterId={id} value={value} />
    {:else if key == 'tags'}
      <Tags filterId={id} value={value} />
    {/if}
  {/each}
</div>
<div class="filter-block-close"></div>
