<script>
  import { filters } from "./store.js";
  import RawFiltersText from "./raw.svelte";

  let isShowingRawFilter = true;
</script>

{#if isShowingRawFilter}
  <RawFiltersText on:click={() => {isShowingRawFilter = !isShowingRawFilter}} />
{/if}