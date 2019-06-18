<script>
  import FilterItemTokenInput from "./filter-item-token-input.svelte";
  import { GAMETYPES } from '../global.js';

  export let filterId = "0default";
  export let value = [];
  let options = Object.keys(GAMETYPES).map(gametype_id => ({id: parseInt(gametype_id), name: GAMETYPES[gametype_id]}));

</script>

<FilterItemTokenInput
  filterId={filterId}
  name="gametype"
  value={value}
  allowFreeTagging={false}
  options={options}
/>
