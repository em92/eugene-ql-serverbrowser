<script>
  import FilterItemTokenInput from "./filter-item-token-input.svelte";
  import { COUNTRY_CODE_LIST } from '../global.js';

  export let filterId = "0default";
  export let value = [];
  let options = COUNTRY_CODE_LIST.map( item => ({id: item, name: item}) );
</script>

<FilterItemTokenInput
  filterId={filterId}
  name="country"
  value={value}
  allowFreeTagging={false}
  options={options}
/>
