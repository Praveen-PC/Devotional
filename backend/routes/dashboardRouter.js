const express=require('express')
const router=express.Router()
const dashboardController=require('../controllers/dashboardController')

router.get('/dashboard',dashboardController.dashboard)
router.get('/allprogram',dashboardController.allprogramDetails)

module.exports=router