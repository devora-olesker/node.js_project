const express = require("express")
const router=express.Router()
const professions=require("../Model/professions")

router.get("/getAllProfessions",async (req,res)=>{
    professions.find((err,result)=>{
        if(!err){
            res.status=200
            res.send(result)
        }
        else {
            res.status = 404
            console.log('can not get data from db...' + err)
            res.end()
        }
    })
})
module.exports = router