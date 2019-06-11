<script>
  import { filters } from "./store.js";
  import { FILTER_ITEM_PROMPTS } from "../global.js";
  import jQuery from 'jquery';

  export let filterId = "0default";
  export let name = "tags";
  export let value = [];
  export let options = [];

  function tokenInput(node) {
    var self = this;
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
      allowFreeTagging: true, //this.allowFreeTagging,
      prePopulate: value.map(item => ({id: item, name: item})),
      /*prePopulate: ( this.allowFreeTagging ?
        this.state.value.map( item => ({id: item, name: item}) ) :
        this.tokens.filter( token => {return self.state.value.indexOf(token.id) > -1})
      ),*/
      preventDuplicates: true,
      resultsLimit: 5,
      searchingText: ""
    };

    //$(node).tokenInput(this.tokens, token_input_options);
    jQuery(node).tokenInput([], token_input_options);
  }
</script>

<div class="filter-item">
  <div class="filter-item-left">{FILTER_ITEM_PROMPTS[name]}</div>
  <div class="filter-item-right">
    <input type="text" use:tokenInput />
  </div>
</div>