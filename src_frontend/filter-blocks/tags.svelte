<script>
  import FilterItemTokenInput from "./filter-item-token-input.svelte";

  export let filterId = "0default";
  export let value = [];
</script>

<FilterItemTokenInput filterId={filterId} name="tags" value={value} />
