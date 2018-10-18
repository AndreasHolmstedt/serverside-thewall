console.log("cleaning statuses")
const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'theWall';  // Database Name
const collectionName = "statuses";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);
  var query = {};
  dbo.collection(collectionName).deleteMany(query, function(err, result) {
    if (err) throw err;
    console.log(`Deleted ${result.deletedCount} count.`);
    db.close();
  });
});

console.log("shutdown")
