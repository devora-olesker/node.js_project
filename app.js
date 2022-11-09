const myMongoose = require("mongoose")
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const routers = require('./routers')
require("dotenv").config();

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
myMongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }
)
var db = myMongoose.connection
db.on('open', () => {
    console.log("db connected!!");
})


//run server
const port = process.env.PORT 
app.listen(port, async() => {
    console.log(`I'm running on port ${port}`);
})


