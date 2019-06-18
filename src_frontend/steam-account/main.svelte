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

<style>
  a:hover,
  a {
    color: white;
  }

  .signin {
    position: absolute;
    top: 5px;
    right: 5px;
  }

  .steam_account_block .right_block_wrapper {
    margin-left: 37px;
    font-size: small;
    line-height: 17px;
  }

  .steam_account_block img {
    float: left;
    border: 1px solid black;
  }

  .steam_account_block {
    background-color: #2a3f5a;
    color: white;
    border: 1px solid black;
    position: absolute;
    right: 5px;
    top: 5px;
    min-width: 200px;
    border-radius: 5px;
    padding: 5px;
  }
</style>

{#if loading}
  <div class="steam_account_block">Loading...</div>
{:else if settings.steam_id == "0"}
  <a class="signin" href="/auth/steam">
    <img alt="Sign in using Steam" src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png" />
  </a>
{:else}
  <div class="steam_account_block">
    <img alt="avatar" src={settings.avatar} />
    <div class="right_block_wrapper">
      <div>Hello, <QLNickname nickname={settings.name}! /></div>
      <div>
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