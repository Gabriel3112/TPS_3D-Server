var LobbyConfig = require('./lobbyConfig');

module.exports = class LobbyBase{
  constructor(mode, server, rmt){
    this.config = new LobbyConfig(mode);
    this.playersConnected = new Array();
    this.server = server;
    this.rmt = rmt;
  }
  
  OnConfigurationLobby(){
    console.log('this lobby is mode: ' + this.config.mode);
    //LobbyConfig exist two modes: World and Match
    if(this.config.mode == 'World'){
      this.config.maxPlayer = new Number(50);
    }else if(this.config.mode == 'Match'){
      this.config.maxPlayer = new Number(10);
    }
  }

  OnUpdateMove(playerInfo){
    this.playersConnected.forEach(player=>{
      if(player.UID != playerInfo.UID){
        if(player.position != playerInfo.position){
          player.position = playerInfo.position;
          console.log(player.position);
        }
      }
    })
  }
}
