const GenericController=require('./Controllers/GenericController')
const PatiantsController=require('./Controllers/PatiantsController')
const DoctorController=require('./Controllers/DoctorController')
const ProfessionsController=require('./Controllers/ProfessionController')
const router=require("express").Router()

//טעינת הקונטרולר
//נתינת ניתוב ראשי
//router.use("/api/GenericController",GenericController)
router.use("/api/patiantsController",PatiantsController)
router.use("/api/docdorController",DoctorController)
router.use("/api/professionsController",ProfessionsController)

module.exports=router