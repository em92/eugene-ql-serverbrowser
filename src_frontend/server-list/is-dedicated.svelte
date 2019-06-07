<script>
  export let server = {
    dedicated: false,
  };
</script>

<td>
  {#if !server.dedicated}
     <img alt="dedicated" src="/images/home.png" />
  {/if}
</td>
