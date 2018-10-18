const Client = require("mongodb").MongoClient
const url = "mongodb://127.0.0.1:27017"

console.log('Connecting to MongoDB at', url)
Client.connect(url, { useNewUrlParser: true }, (err, client) => {
    if(err) {
        console.log(err)
        return true
    }
	const db = client.db('theWall');
	const collection = db.collection('statuses');
	console.log(`Connecting to statuses...`);
		collection.createIndex( { timestamp: -1 }, function(err, result) {
			if( err ) {
				console.log('Failed to create index. ', err);
				client.close();
				return;
			}
			console.log("index created: ", result);
			client.close();
  });
});
