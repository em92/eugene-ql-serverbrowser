<script>
  import QLNickname from "../ql-nickname.svelte";
  import { pause } from "../server-list/store.js";

  let loading = true;
  let settings = {steam_id: "0"};
  let settingsSavingStatus = "";
  let promoteSettingStatus = "";

  fetch("/get_settings")
  .then( response => response.json())
  .then( data => {
    settings = data;
  })
  .catch( error => {
    console.error(error);
  })
  .finally( () => {
    loading = false;
    pause.set(false);
  })

  function saveSettings() {
    settingsSavingStatus = "Saving...";
    fetch("/save_settings", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: window.localStorage['filterDataB']
    })
    .then( () => {
      settingsSavingStatus = "Saved";
    })
    .catch( error => {
      settingsSavingStatus = "Error";
      console.error(error);
    })
    .finally( () => {
      setTimeout( () => {settingsSavingStatus = ""}, 3000);
    })
  }

  function promote() {
    promoteSettingStatus = "Promoting...";
    fetch("/promote", {
      method: "POST",
    })
    .then( response => response.json())
    .then( data => {
      promoteSettingStatus = data.message;
    })
    .catch( error => {
      promoteSettingStatus = "Error";
      console.error(error);
    })
    .finally( () => {
      setTimeout( () => {promoteSettingStatus = ""}, 3000);
    })
  }
</script>

<!--var SteamAccountBlock = React.createClass({

  onPromoteClick: function() {
    this.setState({promoting_progress: "Promoting..."});
    var self = this;
    $.ajax({
      url: "promote",
      method: "POST",
      data: "dummy",
      success: function (data) {
        self.setState({promoting_progress: data.message});
        setTimeout( function() {
          self.setState({promoting_progress: false})
        }, 3000);
      },
      error: (function (xhr, status, err) {
        this.props.getSettingsCallback({error: err});
        this.setState({
          error: err,
          loading: false
        });
        this.setState({promoting_progress: "Error"});
        console.error(xhr, status, err);
      }).bind(this)
    });
  },

  render: function() {
    if (this.state.loading)
      return <div id="steam_account_block">Loading...</div>

    if (this.state.steam_id == "0")
      return <a id="steam_signin" href="/auth/steam">
        <img src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png" />
      </a>

    return <div id="steam_account_block">
      <img src={this.state.avatar} />

      <div className="right_block_wrapper">
        <div className="hello">Hello, {render_ql_nickname(this.state.name)}!</div>
        <div className="cntrl">
          { this.state.settings_saving_progress ? <span>{this.state.settings_saving_progress}</span> : <a href="javascript:void(0)" onClick={this.saveSettings}>Save settings</a> }
          <span> | </span>
          { this.state.promoting_progress ? <span>{this.state.promoting_progress}</span> : <a href="javascript:void(0)" onClick={this.onPromoteClick}>Promote joined server</a> }
          <span> | </span>
          <a href="/logout">Logout</a></div>
      </div>
    </div>;
  }

});

-->

<style>
  .signin {
    position: absolute;
    top: 5px;
    right: 5px;
  }
</style>

{#if loading}
  <div id="steam_account_block">Loading...</div>
{:else if settings.steam_id == "0"}
  <a class="signin" href="/auth/steam">
    <img alt="Sign in using Steam" src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png" />
  </a>
{:else}
  <div id="steam_account_block">
    <img alt="avatar" src={settings.avatar} />
    <div class="right_block_wrapper">
      <div class="hello">Hello, <QLNickname nickname={settings.name}! /></div>
      <div class="cntrl">
        {#if settingsSavingStatus}
          <span>{settingsSavingStatus}</span>
        {:else}
          <a href="javascript:void(0)" on:click={saveSettings}>Save settings</a>
        {/if}
        <span> | </span>
        {#if promoteSettingStatus}
          <span>{promoteSettingStatus}</span>
        {:else}
          <a href="javascript:void(0)" on:click={promote}>Promote joined servers</a>
        {/if}
        <span> | </span>
        <a href="/logout">Logout</a>
      </div>
    </div>
  </div>
{/if}