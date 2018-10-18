const Client = require("mongodb").MongoClient
const ObjectId = require('mongodb').ObjectId
const url = "mongodb://127.0.0.1:27017"

let error = msg => {
    return { "error": msg }
}

const groups = {
    getAll: function(callback) {
        Client.connect(url, { useNewUrlParser: true }, function(err, client) {
            const db = client.db("theWall")
            const collection = db.collection("groups")

            let resultArray = [];
            let cursor = collection.find({});

            cursor.forEach(function(doc, err){
                resultArray.push(doc);
            }, function(){
                client.close();
                callback(resultArray); // can't simply return a value from an asynchronous function call. Thats why a callback was needed here (https://stackoverflow.com/questions/42235886/express-res-send-is-not-returning-the-result-of-my-module-exported-function-that)
            });
        });
    },
    join: function(groupId, userId, callback) {
        Client.connect(url, { useNewUrlParser: true }, function(err, client) {
            const db = client.db("theWall")
            const collection = db.collection("groups")

            collection.updateOne({ "_id": ObjectId(groupId) }, { $push: { "members": ObjectId(userId) }})
            
            client.close()
            callback({ "msg": "Added user " + userId + " to group " + groupId })
        });
      },
    leave: function(groupId, userId, callback) {
        Client.connect(url, { useNewUrlParser: true }, function(err, client) {
            const db = client.db("theWall")
            const collection = db.collection("groups")

            collection.updateOne({ "_id": ObjectId(groupId) }, { $pull: { "members": ObjectId(userId) }})
            
            client.close()
            callback({ "msg": "Removed user " + userId + " from group " + groupId })
        });
    }
}

module.exports = groups
