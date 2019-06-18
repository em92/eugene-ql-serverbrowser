<script>
  import FilterItemCombo from "./filter-item-combo.svelte";

  export let filterId = "0default";
  export let value = "none";
</script>

<FilterItemCombo
  filterId={filterId}
  name="g_gamestate"
  value={value}
  options={[
    {'value': "PRE_GAME", "title": "Warmup"},
    {'value': "IN_PROGRESS", 'title': "In progress"},
  ]}
/>