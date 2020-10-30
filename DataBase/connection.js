var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://admin:88170591Ga@clusterunity.5ofjs.gcp.mongodb.net/UsersInformation?retryWrites=true&w=majority';

  MongoClient.connect(url, { useUnifiedTopology: true },(err, db)=>{
    if(err) throw err;
    console.log('Database Connected!')
    var dbo = db.db('UsersInformation');
    var collectionUsers = dbo.collection('Users');
    exports.coll={collectionUsers:collectionUsers, db:db};
  });

  
  








