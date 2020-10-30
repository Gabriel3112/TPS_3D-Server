const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const auth = require('./Database/users');

const LobbyConnect = require('./Classes/Lobbies/lobbyConnect');



const PORT = 3000;

server.on('connect',()=>{
  console.log('Player Connected');
})

server.on('listening', ()=>{
  const address = server.address();
  console.log(`server initialized in adress and port: ${address.address}:${address.port}`);
});

server.on('error', (err)=>{
  console.log('Error: ' + err);
})



server.on('message',(data, rmt)=>{
  var json = JSON.parse(data);
  var lobby = new LobbyConnect(server, rmt);

  switch(json.callback){
    case 'auth':
      auth.Users.AddUser(json, lobby, server, rmt);
    break;
    case 'move':
    console.log(json)
      lobby.Lobbies.forEach(lobby=>{
        lobby.OnUpdateMove(json);
      })
    break;
    case 'QuitGame':
      console.log(json.callback);
    break;
  }

});

function SendDataRemote(content, rmt){
  server.send(Buffer.from(content), 0, content.length, rmt.port, rmt.address);
  console.log('JSON sending: ' + content);
}
server.bind(process.env.PORT || PORT);
