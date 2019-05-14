<script>
  export let server = {
    password: true,
  };
</script>

<td>
  {#if server.password}
    <img alt="private" src="/images/lock.png" />
  {/if}
</td>
