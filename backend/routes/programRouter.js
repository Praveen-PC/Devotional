
const express=require('express')
const router=express.Router()
const programController=require('../controllers/programController')

router.get('/allProgram',programController.getAllProgram)
router.post('/addProgram',programController.addProgram)
router.post('/addFund',programController.addAmount)
router.get('/programFund/:id',programController.getFundDetails)
router.get('/allDevotees',programController.allDevotees)
router.get('/userdata/:phoneNo',programController.userData)

module.exports=router