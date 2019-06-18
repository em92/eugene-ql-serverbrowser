<script>
  import FilterItemCombo from "./filter-item-combo.svelte";

  export let filterId = "0default";
  export let value = "none";
</script>

<FilterItemCombo
  filterId={filterId}
  name="private"
  value={value}
  options={[
    {'value': "false", "title": "Public"},
    {'value': "true", 'title': "Private"},
  ]}
/>
