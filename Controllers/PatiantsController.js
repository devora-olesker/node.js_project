const express = require("express")
const router = express.Router()
const patients = require("../Model/patients")
const doctors = require("../Model/doctors")
const visit = require("../Model/visit")
const { date } = require("../Model/visit")

//Get all patients
router.get("/GetAllPatients", async (req, res) => {
    patients.find(async (err, result) => {
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


//Get a single patient by his id
router.get("/GetPatientById/:id", (req, res) => {
    patients.findById(req.params.id, async (err, result) => {
        if (!err) {
            res.status = 200
            res.send(result)
        }
        else {
            res.status = 400
            console.log('can not get data from db...' + err)
            res.end()
        }
    })
})


//Get a single patient by his TZ number
router.get("/GetPatientByTz/:tz", (req, res) => {
    patients.findOne({ 'tz': req.params.tz }, async (err, result) => {
        if (!err) {
            res.status = 200
            res.send(result)
        }
        else {
            res.status = 400
            console.log('can not get data from db...' + err)
            res.end()
        }
    })
})


//Get a single patient by name and password
router.get("/GetPatientByNameAndPassword/:name/:pass", async (req, res) => {
    patients.exists({ $and: [{ 'lname': req.params.name }, { 'password': req.params.pass }] }, async (err, result) => {
        if (!err) {
            console.log(result);
            res.status = 200
            res.send(result)
        }
        else {
            res.status = 400
            console.log('can not get data from db...' + err)
            res.end()

        }
    })
})


//Add a new patient
router.put("/addPatient", async (req, res) => {
    const { tz, tz_pic, fname, lname, password, phone, address, visits } = await req.body
    patients.create(
        { tz, tz_pic, fname, lname, password, phone, address, visits }
        , async (err, result) => {
            if (!err) {
                res.status = 200
                res.send(result)
            }
            else {
                res.status = 400
                console.log('can not get data from db...' + err)
                res.end()
            }
        })
})


//Get all of a patients visits
router.get("/getVisitById/:tz", async (req, res) => {
    patients.findOne({ 'tz': req.params.tz }, 'visits', async (err, result) => {
        if (!err) {
            console.log(result);
            res.status = 200
            res.send(result.visits)
        }
        else {
            res.status = 400
            console.log('can not get data from db...' + err)
            res.end()
        }
    })
})


//Gets vist id and patient tz number, and returns the doctors info
router.get("/getDoctorByIdAndVisitId/:tz/:visitId", async (req, res) => {
    patients.findOne({ 'tz': req.params.tz }, async (err, p) => {
        if (!err) {
            let v = await p.visits.find(x => x.visit_id == req.params.visitId)
            let docId = v.doctor_id
            doctors.findOne({ 'doctor_id': docId }, async (error, d) => {
                if (!error) {
                    res.status = 200
                    res.send(d)
                }
                else {
                    res.status = 404
                    console.log('can not get data from db...' + err)
                    res.end()
                }
            })
        }
        else {
            res.status = 400
            console.log('can not get data from db...' + err)
            res.end()
        }
    })
})


//Gets a patients tz number, and either p-previous or f-future, and returns the appropriate visits
router.get("/getVisitByIdAndParam/:tz/:param", async (req, res) => {
    const d = new Date()
    const dt = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
    patients.findOne({ 'tz': req.params.tz }, 'visits', async (err, result) => {
        if (!err) {
            console.log(result);
            //get previous visits 
            if (req.params.param == 'p')
                lst = await result.visits.filter(async x => x.date < dt)
            //get future  visits
            if (req.params.param == 'f')
                lst = await result.visits.filter(async x => x.date >= dt)
            res.status = 200
            res.send(lst)
        }
        else {
            res.status = 400
            console.log('can not get data from db...' + err)
            res.end()
        }
    })
})


//Get vists by doctor id and patients tz number
router.get("/getVisitsByDoctorId/:tz/:id", async (req, res) => {
    patients.findOne({ 'tz': req.params.tz }, 'visits', async (err, result) => {
        if (!err) {
            console.log(result);
            lst = await result.visits.filter(x => x.doctor_id == req.params.id)
            res.status = 200
            res.send(lst)
        }
        else {
            res.status = 400
            console.log('can not get data from db...' + err)
            res.end()
        }
    })
})


//Gets all of a doctors visits
router.get("/getAllDoctorVisits/:id", async (req, res, next) => {
    patients.find(async (err, result) => {
        if (!err) {
            let l = []
            let lst = await result
            // console.log(lst);
            lst.forEach(async x => {
                // console.log(x.visits)
                await x.visits.forEach(async v => {
                    if (v.doctor_id == req.params.id) {

                        console.log(v)
                        length = await l.push(v);
                    }
                })
            })
            next()
            console.log(l);
            res.status = 200
            res.send(l)
        }
        if (!result) {
            res.status = 404
            console.log('can not get data from db...' + err)
            res.end()
        }
    })
})


//Add a visit for a patient
router.post("/addVisitToUser/:tz", async (req, res) => {
    let v = await req.body
    patients.findOne({ 'tz': req.params.tz }, async (err, paitant) => {
        if (!err) {
            console.log(paitant)
            if (!v) {
                console.log('no data sent in body')
                res.status = 404
                res.end()
            }
            else {
                let visitsLst = await paitant.visits
                console.log(v);
                v.visit_id = visitsLst.length
                await visitsLst.push(v)
                await console.log(visitsLst);
                patients.updateOne({ 'tz': req.params.tz }, { $set: { 'visits': visitsLst } }, { returnDocument: 'after' }, async (err, result) => {
                    if (!err) {
                        res.status = 200
                        console.log(result);
                        res.send(visitsLst)
                    }
                    else {
                        res.status = 404
                        console.log('can not get data from db...' + err)
                        res.end()
                    }
                })
            }
        }
        else {
            res.status = 404
            console.log('can not get data from db...' + err)
            res.end()
        }
    })
})


//Update a patients visit
router.post("/updateVisitToUser/:tz/:id", async (req, res) => {
    let v = await req.body
    patients.findOne({ 'tz': req.params.tz }, async (err, paitant) => {
        if (!err) {
            let visitsLst = await paitant.visits
            console.log(v);
            let index = await visitsLst.findIndex(x => x.visit_id == req.params.id)
            visitsLst[index] = v
            patients.updateOne({ 'tz': req.params.tz }, { $set: { 'visits': visitsLst } }, { returnDocument: 'after' }, async (err, result) => {
                if (!err) {
                    res.status = 200
                    console.log(result);
                    res.send(visitsLst)
                }
                else {
                    res.status = 404
                    console.log('can not get data from db...' + err)
                    res.end()
                }
            })
        }
        else {
            res.status = 404
            console.log('can not get data from db...' + err)
            res.end()
        }
    })
})


module.exports = router
