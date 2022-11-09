

const express = require("express")
const router = express.Router()
const GenericController = require("./GenericController")
const patients = require("../Model/patients")
const doctors = require("../Model/doctors")
const visit = require("../Model/visit")
const bodyParser = require('body-parser')
const { date } = require("../Model/visit")

var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//קבלת כל הפצינטים
router.get("/GetAllPatients", async (req, res) => {
    GenericController.GetAllData(req, res, patients)
})

//קבלת פצינט לפי קוד
router.get("/GetPatientById/:id", (req, res) => {
    patients.findById(req.params.id, async (err, result) => {
        if (!err) {
            res.status = 200
            res.send(result)
        }
        else {
            res.status = 404
            console.log('can not get data from db...' + err)
            res.end()
        }
    })
})

//קבלת פצינט לפי תעודת זהות
router.get("/GetPatientByTz/:tz", (req, res) => {
    patients.findOne({ 'tz': req.params.tz }, async (err, result) => {
        if (!err) {
            res.status = 200
            res.send(result)
        }
        else {
            res.status = 404
            console.log('can not get data from db...' + err)
            res.end()
        }
    })
})
//בדיקה האם משתמש קיים על פי שם וסיסמא
router.get("/GetPatientByNameAndPassword/:name/:pass", async (req, res) => {
    patients.exists({ $and: [{ 'lname': req.params.name }, { 'password': req.params.pass }] }, async (err, result) => {
        if (!err) {
            console.log(result);
            res.status = 200
            res.send(result)
        }
        else {
            res.status = 404
            console.log('can not get data from db...' + err)
            res.end()

        }
    }
    )
})
//הוספת פציינט חדש

router.put("/addPatient", async (req, res) => {
    const { tz, tz_pic, fname, lname, password, phone, address, visits } = await req.body

    patients.create({ tz, tz_pic, fname, lname, password, phone, address, visits }
        , async (err, result) => {
            if (!err) {
                res.status = 200
                res.send(result)
            }
            else {
                res.status = 404
                console.log('can not get data from db...' + err)
                res.end()
            }
        })
})
// שליפת ביקורים על פי תז פציינט
router.get("/getVisitById/:tz", async (req, res) => {
    patients.findOne({ 'tz': req.params.tz }, 'visits', async (err, result) => {
        if (!err) {
            console.log(result);
            res.status = 200
            res.send(result.visits)
        }
        else {
            res.status = 404
            console.log('can not get data from db...' + err)
            res.end()
        }
    })
})
//קבלת פרטי רופא ע"י  תעודת זהות וקוד ביקור
router.get("/getDoctorByIdAndIdVisit/:tz/:idVisit", async (req, res) => {
    patients.findOne({ 'tz': req.params.tz }, async (err, p) => {
        if (!err) {
            let v = await p.visits.find(x => x.visit_id == req.params.idVisit)
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
            res.status = 404
            console.log('can not get data from db...' + err)
            res.end()
        }

    })

})
//	שליפת הביקורים לפי תז פציינט ולפי פרמטר (עתידיים/ היסטוריה)

router.get("/getVisitByIdAndParam/:tz/:param", async (req, res) => {
    const d = new Date()
    const dt = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()

    patients.findOne({ 'tz': req.params.tz }, 'visits', async (err, result) => {

        if (!err) {
            console.log(result);
            //קבלת  הסטורית הביקורים 
            if (req.params.param == 'p')
                lst = await result.visits.filter(async x => x.date < dt)
            //קבלת הביקורים העתידיים
            if (req.params.param == 'f')
                lst = await result.visits.filter(async x => x.date >= dt)
            res.status = 200
            res.send(lst)
        }

        else {
            res.status = 404
            console.log('can not get data from db...' + err)
            res.end()
        }
    })

})

//שליפת הביקורים על פי תז פציינט וקוד רופא
router.get("/getVisitsByDoctorId/:tz/:id", async (req, res) => {
    patients.findOne({ 'tz': req.params.tz }, 'visits', async (err, result) => {
        if (!err) {
            console.log(result);
            lst = await result.visits.filter(x => x.doctor_id == req.params.id)
            res.status = 200
            res.send(lst)
        }
        else {
            res.status = 404
            console.log('can not get data from db...' + err)
            res.end()
        }
    })
})
//מביא את כל הביקורים לפי קוד רופא
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

            // lst= await lst.filter(x=>x.doctor_id==req.params.id)
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

//הוספת ביקור חדש לפציינט
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

//עדכון תור לפי תז 
router.post("/updateVisitToUser/:tz/:id", async (req, res) => {
    let v = await req.body
    patients.findOne({ 'tz': req.params.tz }, async (err, paitant) => {
        if (!err) {
            // 

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
// const d=new Date()
// const dt=d.getDay()
// console.log(dt)