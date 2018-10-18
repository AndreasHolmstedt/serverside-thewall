/*
    Data structure example
    group: {
        _id: xx
        name: "Kent Lovers"
        description: "Everybody who loves Kent join this group!",
        members: [
            { 
                ObjectId("xx")
            }
        ],
    }
*/

const Client = require("mongodb").MongoClient
const url = "mongodb://127.0.0.1:27017"

console.log('Connecting to MongoDB at', url)
Client.connect(url, { useNewUrlParser: true }, (err, client) => {
    if(err) {
        console.log(err)
        return true
    }

    const db = client.db("theWall")
    const collection = db.collection("groups")
    let data = [
        { 
            name: "Kent Lovers",
            description: "Everybody who loves Kent join this group!",
            members: []
        },
        { 
            name: "Alla vi som heter Glenn",
            description: "Det säger väl sig självt? En svensk grupp på en engelsk sida, vi heter Glenn!",
            members: []
        },
        { 
            name: "Buy & Sell - Chicago, Ia",
            description: "Buy & sell your goods in Illinois",
            members: []
        },
        { 
            name: "Stupid Crazy Coding",
            description: "We're stupid, we're crazy, we're coders.",
            members: []
        },
        { 
            name: "Programmer Humor",
            description: "Are you a programmer? Do you like to laugh? Join this group.",
            members: []
        }
    ]

    console.log(`Connection asserted. Inserting documents`)
    collection.insertMany(data, err => {
        if(err) {
            console.log(err)
            client.close()
            return true
        }
        console.log('Data inserted. Closing client...')
        client.close()
    })
})