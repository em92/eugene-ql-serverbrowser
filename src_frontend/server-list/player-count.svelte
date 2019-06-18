<script>
  export let server = {
    gameinfo: {
      teamsize: 8,
      g_gametype: 11,
      sv_maxclients: 16,
      players: {
        length: 5,
      },
      bots: {
        length: 1
      }
    }
  };

  let d = [
    server.gameinfo.teamsize, // ffa
    server.gameinfo.sv_maxclients, // duel
    server.gameinfo.sv_maxclients, // race
    server.gameinfo.teamsize*2,  // tdm
    server.gameinfo.teamsize*2, // ca
    server.gameinfo.teamsize*2, // ctf
    server.gameinfo.teamsize*2, // 1f
    0, // wut?
    server.gameinfo.teamsize*2, // har
    server.gameinfo.teamsize*2, // ft
    server.gameinfo.teamsize*2, // dom
    server.gameinfo.teamsize*2, // ad
    server.gameinfo.teamsize, // rr
  ][server.gameinfo.g_gametype];

  if (d == 0) {
    d = server.gameinfo.sv_maxclients;
  }
</script>

<td>{server.gameinfo.players.length + ( server.gameinfo.bots.length ? "+" + server.gameinfo.bots.length : "" ) + "/" + d}</td>