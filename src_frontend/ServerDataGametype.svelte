<script>
  import Global from "./Global.js";
  let GAMETYPES = Global.GAMETYPES;
  export let server = {
    gameinfo: {
      g_gametype: 11,
      g_instagib: 0
    }
  }
</script>

<td>{GAMETYPES[server.gameinfo.g_gametype + 100*server.gameinfo.g_instagib]}</td>