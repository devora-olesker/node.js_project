const express = require("express")
const router = express.Router()
const doctors = require("../Model/doctors")

//Get all doctors
router.get("/GetAllDoctors", async (req, res) => {
    doctors.find(async (err, result) => {
        if (!err) {
            res.status = 200
            res.send(result);
        }
        else {
            res.status = 400
            console.log('can not get data from db...' + err)
            res.end()
        }
    })
})

//Get a doctor by profession id
router.get("/GetDoctorsByProfessionId/:professionId", (req, res) => {
    doctors.find({ 'profession_id': req.params.professionId }, async (err, result) => {
        if (!err) {
            res.status = 200
            res.send(result);
        }
        else {
            res.status = 400
            console.log('can not get data from db...' + err)
            res.end()
        }

    })
})

module.exports = router
