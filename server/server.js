const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
var bodyParser = require('body-parser');

const users = require("./users.js")
const statuses = require("./statuses.js")
const groups = require("./groups.js")
const PORT = process.env.PORT || 4000
const API_DESC = `
    API Usage
    GET /                           - Display the homepage
    GET /api/users                  - Get all users
    GET /api/user/:id               - Get user by id
    GET /api/statuses               - Get all statuses
    GET /api/status/:id             - Get status by id
    GET /api/groups/                - Get all groups

    PUT /api/user?                  - Create or update user using querystring, firstName, lastName, email, avatar
    PUT /api/status?                - Create or update status using querystring, ???? data
    PUT /api/group/:id/join/:uid    - uid joins group by id
    PUT /apI/group/:id/leave/:uid   - uid leaves group by id

    DELETE /api/users/:id           - Delete user by id
    DELETE /api/status/:id          - Delete status by id`

const Client = require("mongodb").MongoClient
const ObjectId = require('mongodb').ObjectId
const url = "mongodb://127.0.0.1:27017"

app.use(cors())
app.use(express.static(path.join(__dirname, '..', 'build/')))
//app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
    res.send(API_DESC)
})

app.get("/api/users", (req, res) => {
  users.getAll(function(getAllUsers) {
    res.send(getAllUsers);
  })
})

app.get("/api/user/:id", (req, res) => {
    res.send(users.get(req))
})

app.get("/api/statuses", (req, res) => {
  statuses.getAll().then((data)=>{
    res.send(data)
  })
})

app.get("/api/status/:id", (req, res) => {
    res.send(statuses.get(req))
})

app.post("/api/user/", (req, res) => {
    users.createOrUpdate(req).then((data)=>{
      res.send(data)
    })
})

app.put("/api/status", (req, res) => {
    statuses.createOrUpdate(req.body).then(data=>{
      res.send(req.body)
  })
})


app.delete("/api/user/:id", (req, res) => {
    users.remove(req.params.id, function(removeById) {
        res.send(removeById)
    })
})

app.delete("/api/status/:id", (req, res) => {
    statuses.remove(req.params.id, function(removeById) {
        res.send(removeById)
    })
})

app.get("/api/groups", (req, res) => {
    groups.getAll(function(getAllGroups) {
        res.send(getAllGroups);
    })
})

app.put("/api/group/:id/join/:uid", (req, res) => {
    groups.join(req.params.id, req.params.uid, function(joinGroup) {
        res.send(joinGroup);
    })
})

app.put("/api/group/:id/leave/:uid", (req, res) => {
    groups.leave(req.params.id, req.params.uid, function(leaveGroup) {
        res.send(leaveGroup);
    })
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})

app.listen(PORT, () => {
    console.log("Listening to port", PORT)
})
