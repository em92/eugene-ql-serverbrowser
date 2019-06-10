import { derived, writable } from 'svelte/store';

export let filters = writable({"0default": {"turbo": false, "gametype": ["any"]}});
export let cleanFilters = derived(
  filters, ($filters) => {
    return Object.keys( $filters ).map( i => {
      var state = $.extend({}, $filters[i]);
      if (state.tags) { // list of tags must have AND logic
        state.tags = state.tags.join();
      }
      return state;
    });
  }
)