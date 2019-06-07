<script>
  import { GAMETYPES } from "../global.js";
  export let server = {
    gameinfo: {
      g_gametype: 11,
      g_instagib: 0
    }
  }
</script>

<td>{GAMETYPES[server.gameinfo.g_gametype + 100*server.gameinfo.g_instagib]}</td>