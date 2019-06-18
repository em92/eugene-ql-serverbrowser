<script>
  import FilterItemCombo from "./filter-item-combo.svelte";

  export let filterId = "0default";
  export let value = "none";
</script>

<FilterItemCombo
  filterId={filterId}
  name="region"
  value={value}
  options={[
    {'value': "eu", "title": "Europe"},
    {'value': "eux", "title": "Europe (with Ural and Siberia)"},
    {'value': "na", 'title': "North America"},
    {'value': "sa", 'title': "South America"},
    {'value': "oc", 'title': "Oceania"},
    {'value': "as", 'title': "Asia"},
    {'value': "asx", 'title': "Asia (without Ural and Siberia)"},
    {'value': "af", 'title': "Africa"},
  ]}
/>
