<script>
  import { filters } from "./store.js";
  import { FILTER_ITEM_PROMPTS } from "../global.js";
  import FilterItemAbstract from "./filter-item-abstract.svelte";

  export let filterId = "0default";
  export let name = "tags";
  export let value = [];
  export let options = [];
  export let allowFreeTagging = true;
  let jQuery = window.jQuery;

  // @todo при изменении какого-либо другого свойства из блока происходит перерисовка
  function tokenInput(node) {
    var token_input_options = {
      theme: "facebook",
      hintText: "",
      noResultsText: "",
      onAdd: (token => {
        filters.update( data => {
          let list = data[filterId][name]
            .concat([token.id])
            .filter((v, i, a) => a.indexOf(v) === i) // filter non-unique values
            .filter((v, i, a) => a.length == 1 || v != "any") // take away "any" value, if length > 1
          ;

          data[filterId][name] = list;
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
        options.filter(token => value.indexOf(token.id) > -1),
      preventDuplicates: true,
      resultsLimit: 5,
      searchingText: ""
    };

    jQuery(node).tokenInput(options, token_input_options);
  }
</script>

<FilterItemAbstract filterId={filterId} name={name}>
  <input type="text" use:tokenInput />
</FilterItemAbstract>
