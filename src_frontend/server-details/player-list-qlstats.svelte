<script>
  export let server = {};

  const TEAMS = ["Play", "Red", "Blue", "Spec", "Bot"];
  const TEAM_CLASS = ['qc2', 'qc1', 'qc4', 'qc7', 'qc2'];
  let players = server.qlstats.players;

  players = players.filter( function(p) {
    return p.steamid != "0";
  });

  players = players.concat(server.gameinfo.bots.map( function(p) {
    return {
      "team": 4,
      "score": p.score,
      "name": p.name
    };
  }));

  players.sort( function(a, b) {
    if (b.team > a.team) return -1;
    if (b.team < a.team) return 1;
    return b.score - a.score;
  });

</script>

<table>
  <thead><tr>
    <th style="width: 55px">Team</th>
    <th>Nick</th>
    <th style="width: 20px">Score</th>
    <th style="width: 50px">Glicko</th>
  </tr></thead>
  <tbody>
    {#each players as { name, score, team, steamid, rating }}
      <tr>
        <td><span class={TEAM_CLASS[team]}>{TEAMS[team]}</span></td>

        <td>{#if steamid}
          <a target="_blank" href={'http://qlstats.net/player/' + steamid}>{name}</a>
        {:else}
          name
        {/if}</td>

        <td>{#if team !=3}
          {score || 0}
        {/if}</td>

        <td>{rating || ""}</td>
      </tr>
    {/each}
  </tbody>
</table>

