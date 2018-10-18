const Client = require("mongodb").MongoClient
const ObjectId = require('mongodb').ObjectId
const url = "mongodb://127.0.0.1:27017"


let error = msg => {
    return { "error": msg }
}

const users = {
    getAll: function(callback) {
      Client.connect(url, { useNewUrlParser: true }, function(err, client) {
        const db = client.db("theWall")
        const collection = db.collection("users")

        let resultArray = [];
        let cursor = collection.find({}).limit(100);

        cursor.forEach(function(doc, err){
          resultArray.push(doc);
        }, function(){
          client.close();
          callback(resultArray); // can't simply return a value from an asynchronous function call. Thats why a callback was needed here (https://stackoverflow.com/questions/42235886/express-res-send-is-not-returning-the-result-of-my-module-exported-function-that)
        });
      });
    },
    get: function(id, callback) {


      Client.connect(url, { useNewUrlParser: true }, function(err, client) {
        if(err) {
            console.log(err)
            return error(err.message)
        }

        const db = client.db("theWall")
        const collection = db.collection("users")

        let cursor = collection.find(ObjectId(id))

        cursor.forEach(function(doc, err){
          callback(doc)
        }, function(){
          client.close();
        });

      })


    },
    createOrUpdate: function(req) {

      const user_data = req.body

      return new Promise((resolve, reject)=>{
        let res, query;
        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                console.log(err)
                return error(err.message)
            }
            const db = client.db("theWall")
            const collection = db.collection("users")
            if (user_data._id){
                query = {_id: ObjectId(user_data._id)};
            }else{
                query = {};
            }

            collection.updateOne(query, {
              $set: {friends: user_data.friends, first_name: user_data.first_name, last_name: user_data.last_name, url: user_data.url, email: user_data.email}
            }, { upsert: true }, function(res, err){
              console.log(res)
              console.log(err)
              resolve(res)
            })
        })
      });
    },
    remove: function(id, callback) {
        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                console.log(err)
                callback(error(err.message))
            }

            const db = client.db("theWall")
            const collection = db.collection("users")

            collection.deleteOne({ "_id": ObjectId(id)}, (err) => {
                if(err) {
                    callback(error(err.message))
                }

                callback({ msg: "Succesfully deleted status with id " + id })
            })

            client.close()
        })
    }
}

module.exports = users
