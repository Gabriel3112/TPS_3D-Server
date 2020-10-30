const database = require('./connection');
const Player = require('../Classes/Player/Player');
const LobbyConnect = require('../Classes/Lobbies/lobbyConnect');
const Vector3 = require('../Classes/Vector3');

exports.Users = {
  AddUser: (json, lobby, server, rmt)=>{
    var player = new Player();
    player.UID = json.UID;
    player.displayName = json.displayName;
    player.email = json.email;
    
    
    database.coll.collectionUsers.find({UID: player.UID}).toArray().then((result)=>{
      if(!result[0]){
       
        database.coll.collectionUsers.insertOne(player).then((result)=>{
          var auth = "auth"          + ':' + 
          result.position            + ':' + 
          result.level               + ':' + 
          result.health              + ':' + 
          result.mana                + ':' + 
          result.stamina             + ':' + 
          result.XP                  + ':' + 
          result.skillPointsCurrent  + ':' + 
          result.skillPoints;
          server.send(Buffer.from(auth), 0, auth.length, rmt.port, rmt.address);
          console.log('User sending success');
          player = result;
          lobby.OnRegister(player);
        }).catch((err)=>{
          console.log(err);
        })
      }else{
        var auth = "auth"             + ':' + 
        result[0].position            + ':' + 
        result[0].level               + ':' + 
        result[0].health              + ':' + 
        result[0].mana                + ':' + 
        result[0].stamina             + ':' + 
        result[0].XP                  + ':' + 
        result[0].skillPointsCurrent  + ':' + 
        result[0].skillPoints;

        player = result[0];
        lobby.OnRegister(player);
        console.log(auth);
        server.send(Buffer.from(auth), 0, auth.length, rmt.port, rmt.address);
        console.log('Sending...');
        
      }
    }).catch((err)=>{
      console.log(err);
    });
  }
}



   