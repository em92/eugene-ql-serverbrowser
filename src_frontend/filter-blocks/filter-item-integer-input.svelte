<script>
  import { filters } from "./store.js";
  import { FILTER_ITEM_PROMPTS } from "../global.js";
  import FilterItemAbstract from "./filter-item-abstract.svelte";

  export let filterId = "0default";
  export let name = "min_players";
  export let value = "none";

  function onAnythingChanged(event) {
    var result = 0;
    if (event.target.value.trim() != '') {
      result = parseInt(event.target.value);
    }
    if (result != result) result = 0; // NaN -> 0
    if (result < 0) result *= -1;
    if (result > 9999) result = 9999;
    event.target.value = value = result;

    filters.update( data => {
      data[filterId][name] = value;
      return data;
    });
  }
</script>

<FilterItemAbstract filterId={filterId} name={name}>
  <input type="number" class="simple_text" value={value} on:input={onAnythingChanged} />
</FilterItemAbstract>
