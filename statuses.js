const Client = require("mongodb").MongoClient
const ObjectId = require('mongodb').ObjectId
const url = "mongodb://127.0.0.1:27017"

let error = msg => {
    return { "error": msg }
}

const statuses = {
    getAll: function(req) {
      let user_id = req.params.id
      return new Promise((resolve, reject)=>{
        let res;

        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                console.log(err)
                return error(err.message)
            }

            const db = client.db("theWall")
            const users_collection = db.collection("users")
            const statuses_collection = db.collection("statuses")

            let query = {_id: ObjectId(user_id)}
            users_collection.findOne(query, function(err, result) {
              if (err) throw err;


                let friends_ids = result.friends.map(function(id) { return ObjectId(id); });
                friends_ids.push(ObjectId(user_id))


                statuses_collection.aggregate([{ $match: { author: { $in: friends_ids}}}, { $sort : { timestamp : -1} }, { $limit : 30 }] ).toArray((err, docs) => {
                    client.close()
                    if(err) {
                        console.log(err)
                        res = error(err.message)
                        return true
                    }
                    res = docs
                    resolve(res)
                })
              }
            );


        });
      });
    },
    createOrUpdate: function(req, callback) {

        let status = {
            _id: req.query._id || null,
            text: req.query.text,
            author: req.query.author,
            timestamp: req.query.timestamp || new Date(),
            likes: req.query.likes || [],
            comments: req.query.comments || []
        }

        let query;
        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                callback(error(err.message))
                client.close()
                return true
            }

            const db = client.db("theWall")
            const collection = db.collection("statuses")

            if (status._id) {
                query = { _id: ObjectId(status._id) };
            } else {
                query = { _id: ObjectId(0) };
            }

            collection.updateOne(query, {
                $set: { text: status.text, author: ObjectId(status.author), timestamp: status.timestamp, likes: status.likes, comments: status.comments }
            }, { upsert: true }, function(err, res) {
                if(err) {
                    callback(error(err.message))
                    client.close()
                    return true
                }

                callback(res)
                client.close()
            })
        })
    },
    remove: function(id, callback) {
        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                console.log(err)
                callback(error(err.message))
            }

            const db = client.db("theWall")
            const collection = db.collection("statuses")

            collection.deleteOne({ "_id": ObjectId(id)}, (err) => {
                if(err) {
                    callback(error(err.message))
                }

                callback({ msg: "Succesfully deleted status with id " + id })
            })

            client.close()
        })
    },
    likeStatus: function(req, callback) {
        let addOrRemoveId;
        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                console.log(err)
                callback(error(err.message))
            }

            const db = client.db("theWall")
            const collection = db.collection("statuses")
            let query = { _id: ObjectId(req.params.status_id) }

                collection.updateOne(query, { $addToSet: { likes: req.params.user_Id  }}  , function(err, res) {
                    if(err) {
                        callback(error(err.message))
                        client.close()
                        return true
                    }
                    callback(res)
                    client.close()
                })

        })
    },
    dislikeStatus: function(req, callback) {
        let addOrRemoveId;
        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                console.log(err)
                callback(error(err.message))
            }

            const db = client.db("theWall")
            const collection = db.collection("statuses")
            let query = { _id: ObjectId(req.params.status_id) }

                collection.updateOne(query, { $pull: { likes: req.params.user_Id  }}  , function(err, res) {
                    if(err) {
                        callback(error(err.message))
                        client.close()
                        return true
                    }
                    callback(res)
                    client.close()
                })

        })
    }
}

module.exports = statuses
