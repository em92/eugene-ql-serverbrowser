<script>
  import FilterItemTokenInput from "./filter-item-token-input.svelte";
  import { MAPS } from '../global.js';

  export let filterId = "0default";
  export let value = [];
  let options = MAPS.map(mapname => ({id: mapname, name: mapname}));

</script>

<FilterItemTokenInput
  filterId={filterId}
  name="mapname"
  value={value}
  allowFreeTagging={true}
  options={options}
/>
