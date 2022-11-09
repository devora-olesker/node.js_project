const myMongoose = require("mongoose")
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const routers = require('./routers')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//cors
const cors = require("cors")
app.use(cors())

//initallize routers
app.use(routers)

//connect to data base
myMongoose.connect("mongodb://localhost:27017/clinicDB",
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }
)
var db = myMongoose.connection
db.on('open', () => {
    console.log("db connected!!");
})


//run server
const port = `1234`
app.listen(port, async() => {
    console.log(`I'm running on port ${port}`);
})


