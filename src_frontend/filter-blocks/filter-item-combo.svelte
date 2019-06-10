<script>
  import { filters } from "./store.js";
  import { FILTER_ITEM_PROMPTS } from "../global.js";

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

<div class="filter-item">
  <div class="filter-item-left">{FILTER_ITEM_PROMPTS[name]}</div>
  <div class="filter-item-right">
    <select class="form-control input-sm" bind:value={value} on:change={onAnythingChanged}>
      <option value="none" disabled="true"></option>
      {#each options as {value, title}}
        <option value={value}>{title}</option>
      {/each}
    </select>
  </div>
</div>