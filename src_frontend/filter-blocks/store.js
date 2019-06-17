import { derived, writable } from 'svelte/store';
import { isValidFilterDataString } from '../global.js';

var defaultFilterData = {"0default": {"gametype": ['any']}};
var filterDataB = window.localStorage['filterDataB'];
if (isValidFilterDataString(filterDataB)) {
  defaultFilterData = JSON.parse(filterDataB);
}

export let filters = writable(defaultFilterData);
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
export let filterIds = derived(
  filters, $filters => {
    let r = Object.keys($filters);
    r.sort();
    return r;
  }
)

filters.subscribe( $filters => {
  window.localStorage.setItem('filterDataB', JSON.stringify($filters));
})