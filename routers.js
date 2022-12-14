const PatiantsController=require('./Controllers/PatientsController')
const DoctorController=require('./Controllers/DoctorController')
const ProfessionsController=require('./Controllers/ProfessionController')
const router=require("express").Router()

router.use("/api/patientsController",PatiantsController)
router.use("/api/doctorController",DoctorController)
router.use("/api/professionsController",ProfessionsController)

module.exports=router