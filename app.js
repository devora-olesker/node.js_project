const myMongoose = require("mongoose")
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const routers = require('./routers')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//הרשאות גישה
const cors = require("cors")
app.use(cors())

//הפעלת הניתוב הבסיסי
app.use(routers)



myMongoose.connect("mongodb://localhost:27017/clinicDB",
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }
)
var db = myMongoose.connection

db.on('open', () => {
    console.log("db connected!!");
})
//הרצה
const port = `1234`
app.listen(port, async() => {
    console.log(`I'm running on port ${port}`);
    const d = new Date()
    const dt = await d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
    const d2 = await new Date('22/05/2022')
    console.log(dt)
    console.log(d2 < dt);
})


