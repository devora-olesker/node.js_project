

const express = require("express")
const router=express.Router()
const GenericController = require("./GenericController")
const doctors=require("../Model/doctors")
//קבלת כל הדוקטרים
router.get("/GetAllDoctors", async (req, res) => {
    doctors.find(async(err,result)=>{
        if(!err){
            res.status=200
            res.send(result);
        }
        else {
            res.status = 404
            console.log('can not get data from db...' + err)
            res.end()
        }
    })
})
//קבלת דוקטור לפי קוד התמחות 
router.get("/GetDoctorsByIdProfession/:professionId", (req, res) => {
doctors.find({'profession_id':req.params.professionId},async(err,result)=>{
    if(!err){
        res.status=200
        res.send(result);
    }
    else {
        res.status = 404
        console.log('can not get data from db...' + err)
        res.end()
    }
    
})



})


module.exports = router
