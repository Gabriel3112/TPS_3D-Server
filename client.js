const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const HOST = 'localhost';
const PORT = 8080;

var username = 'B13L';
var emit = 'ConnectLobby';
var randomNum;

client.connect(PORT, HOST, ()=>{
  try{
    console.log('Connection client successful!');
   
   SendData({username});
  client.on('message', (msg, rmt)=>{
    
    console.log('receving: ' + msg);
    
  });

   

  function SendData(content){
    client.send(Buffer.from(JSON.stringify(content)), 0, JSON.stringify(content).length);
    console.log('JSON sending: ' + JSON.stringify(content));
  }
   
  }catch(e){
    throw e;
  }
});

//client.connect(8081, HOST);

