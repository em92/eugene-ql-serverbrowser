<script>
  import { filters } from "./store.js";
  import { FILTER_ITEM_PROMPTS } from "../global.js";
  import jQuery from 'jquery';

  export let filterId = "0default";
  export let name = "tags";
  export let value = [];
  export let options = [];
  export let allowFreeTagging = true;

  function tokenInput(node) {
    var token_input_options = {
      theme: "facebook",
      hintText: "",
      noResultsText: "",
      onAdd: (token => {
        filters.update( data => {
          let list = data[filterId][name];
          data[filterId][name] = list.concat([token.id]);
          return data;
        });
      }),
      onDelete: (token => {
        filters.update( data => {
          let list = data[filterId][name];
          data[filterId][name] = list.filter(value => value != token.id);
          return data;
        });
      }),
      allowFreeTagging: allowFreeTagging,
      prePopulate: allowFreeTagging ?
        value.map(item => ({id: item, name: item})) :
        options.filter(token => {value.indexOf(token.id) > -1}),
      preventDuplicates: true,
      resultsLimit: 5,
      searchingText: ""
    };

    jQuery(node).tokenInput(options, token_input_options);
  }
</script>

<div class="filter-item">
  <div class="filter-item-left">{FILTER_ITEM_PROMPTS[name]}</div>
  <div class="filter-item-right">
    <input type="text" use:tokenInput />
  </div>
</div>