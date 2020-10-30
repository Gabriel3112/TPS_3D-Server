var Player = require('../Player/Player');

const LobbyBase = require('./lobbyBase');

module.exports = class LobbyConnect{
  constructor(server, rmt){
    this.Lobbies = new Array();
    this.Server = server;
    this.rmt = rmt;
  }

  OnRegister(player){
    console.log(`Player: {id: ${player.UID}, username: ${player.displayName}, level: ${player.level}} is created`);
    this.OnConnect(player);
  }

  OnConnect(player){
    if(this.Lobbies.length > 0){
      this.Lobbies.forEach(lobby => {
        if(lobby.playersConnected.length < lobby.config.maxPlayer){
          lobby.playersConnected.push(player);
          var spawn = "spawn";
          this.Server.send(Buffer.from(spawn), 0, spawn.length, this.rmt.port, this.rmt.address);
          console.log(`Lobby: ${this.Lobbies.length}, currentPlayers: ${lobby.playersConnected.length}`);
        }
      });
      console.log(this.Lobbies);
      console.log(this.Lobbies.length);
    }
    else{
      this.OnCreateLobby('World');
      this.Lobbies.forEach((lobby)=>{
        lobby.playersConnected.push(player);
        var spawn = "spawn" + ':' + player.UID;
        this.Server.send(Buffer.from(spawn), 0, spawn.length, this.rmt.port, this.rmt.address);
        console.log(`Lobby: ${this.Lobbies.length}, currentPlayers: ${lobby.playersConnected.length}`);
      });
      console.log(this.Lobbies);
      console.log(this.Lobbies.length);
    }
  }

    OnDesconnect(){

    }


  

  OnCreateLobby(mode){
    var lobby = new LobbyBase(mode, this.Server, this.rmt);
    lobby.OnConfigurationLobby();
    this.Lobbies.push(lobby);
    console.log(`Successful create lobby: {mode: ${mode}, maxPlayer: ${lobby.config.maxPlayer}, Lobbies: ${this.Lobbies.length}}`);
  }
}