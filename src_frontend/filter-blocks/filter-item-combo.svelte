<script>
  import { filters } from "./store.js";
  import { FILTER_ITEM_PROMPTS } from "../global.js";
  import FilterItemAbstract from "./filter-item-abstract.svelte";

  export let filterId = "0default";
  export let name = "turbo";
  export let value = "none";
  export let options = [
    {"value": "false", "title": "No"},
    {"value": "true", "title": "Yes"},
  ];

  function onAnythingChanged(event) {
    let intValue = parseInt(event.target.value);
    if (intValue == intValue && intValue.toString() == event.target.value) {
      value = intValue;
    } else if (event.target.value.toLowerCase() == "true") {
      value = true;
    } else if (event.target.value.toLowerCase() == "false") {
      value = false;
    }

    filters.update( data => {
      data[filterId][name] = value;
      return data;
    });
  }
</script>

<FilterItemAbstract filterId={filterId} name={name}>
  <select class="form-control input-sm" bind:value={value} on:change={onAnythingChanged}>
    <option value="none" disabled="true"></option>
    {#each options as {value, title}}
      <option value={value}>{title}</option>
    {/each}
  </select>
</FilterItemAbstract>
