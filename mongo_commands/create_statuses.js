/*

CREATES AROUND 20 STATUS DOCUMENTS PER USER IN DB.
all data is randomly generated.

data structure example
    status: {
        _id: xx
        text: "Det här är en riktigt schyst status."
        author: _id,
        timestamp: 2018-02-08T07:46:48.195Z,
        likes: [],
        comments: [],
    }
*/

const Client = require("mongodb").MongoClient
const ObjectID = require('mongodb').ObjectID;
const url = "mongodb://127.0.0.1:27017"

console.log('Connecting to MongoDB at', url)
Client.connect(url, { useNewUrlParser: true }, (err, client) => {
    if(err) {
        console.log(err)
        return true
    }
    const db = client.db("theWall")
    const collections = [db.collection("users"), db.collection("statuses")]
    let n = 100

    // first get all users currently in db.
    collections[0].find({}, {projection: {_id: 1}}).toArray(function(err, result) {
      if (err) throw err;

      // loop over them to create statuses connected to their ids.
      count = 0
      for (i in result){
        // create random nr of statuses
        r = Math.floor(Math.random() * 10) + 5
        count += r
        statuses = []
        // push the amount of statuses to a list.
        for (j=0; j<r; j++){
          statuses.push(generateStatus(result[i]._id))
        }
        // insert the list and rock the world.
        collections[1].insertMany(statuses, function(err, res) {
          if (err) throw err;
      })
      }
      console.log(`Creating ${count} statuses..`)
      client.close()
    });
})


/*------------------------------------------------------------------------------
------------------------------------------------------------------------------*/


function generateStatus(author){
    // create one random status object.
    const n1 = ['Fint väder idag.', 'Kul med skola.', 'Jag heter kanske bengt.', 'Vem var det som kastade?', 'Röker du mycket eller?', 'Du har fågel?', 'Fint folk kommer sent.', 'A wizard is never late.', 'Vem är jag?', 'Det var baskamig lite törrt.', 'Är jag vaken eller?', 'omg lasers, pew, pew, pew!', 'sy gytt!', 'Vad gör vi nu? ...eller va gör vi sen?', 'tjeeeennaaaaaa', 'Det är skön      t.',];

    let r1 = Math.floor(Math.random() * n1.length);
    let text = `${n1[r1]}`;

    // create a random timestamp
    timestamp = new Date(+(new Date()) - Math.floor(Math.random()*50000000000))

    return {
        author: author,
        text: text,
        timestamp: timestamp,
        likes: [],
        comments: [],
    }
};
