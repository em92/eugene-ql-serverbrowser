<script>
  export let nickname = "^1e^2u^3g^4e^5n^6e^7_^0_";
  export let classname = "";

  var anotherClassname = classname;
  var startIndex = ['0', '1', '2', '3', '4', '5', '6', '7'].reduce(function(result, current) {
    var currentIndex = nickname.indexOf("^" + current);
    if (currentIndex == -1 ) return result;
    if (currentIndex < result) {
      result = currentIndex;
      anotherClassname = "qc" + current;
    }
    return result;
  }, nickname.length);

  var part1 = nickname.substr(0, startIndex);
  var part2 = nickname.substr(startIndex+2);
</script>

{#if nickname.length > 0}
  <span class={classname}>{part1}<svelte:self nickname={part2} classname={anotherClassname} /></span>
{/if}
