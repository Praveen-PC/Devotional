
const express=require('express')
const router=express.Router()
const programController=require('../controllers/programController')

router.get('/allProgram',programController.getAllProgram)
router.post('/addProgram',programController.addProgram)
router.post('/addFund',programController.addAmount)
router.get('/programFund/:id',programController.getFundDetails)
router.get('/allDevotees',programController.allDevotees)
router.get('/userdata/:phoneNo',programController.userData)
router.put('/updateStatus/:id',programController.updateStatus)
router.get('/closedProgram',programController.getClosedProgram)
router.delete('/deleteprogram/:id',programController.removeProgram)
router.put('/updateprogram/:id',programController.updateProgram)

module.exports=router