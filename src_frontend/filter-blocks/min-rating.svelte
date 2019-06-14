<script>
  import FilterItemIntegerInput from "./filter-item-integer-input.svelte";

  export let filterId = "0default";
  export let value = 0;

</script>

<FilterItemIntegerInput
  filterId={filterId}
  name="rating_min"
  value={value}
/>
