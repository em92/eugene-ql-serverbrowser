<script>
  import FilterItemCombo from "./filter-item-combo.svelte";

  export let filterId = "0default";
  export let value = "none";
</script>

<FilterItemCombo filterId={filterId} name="turbo" value={value} />
