
const express=require('express')
const router=express.Router()
const reportController=require('../controllers/reportController')

router.post('/allreports',reportController.allReports)

module.exports=router