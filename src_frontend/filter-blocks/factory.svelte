<script>
  import FilterItemTokenInput from "./filter-item-token-input.svelte";

  export let filterId = "0default";
  export let value = [];

</script>

<FilterItemTokenInput
  filterId={filterId}
  name="g_factory"
  value={value}
  allowFreeTagging={true}
/>
