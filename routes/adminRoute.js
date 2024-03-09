const express =require('express')
const adminContoller =require('../controller/adminController.js')
const router= express.Router()
  
router.get('/adminLogin', adminContoller.adminGet)
router.post('/adminLogin', adminContoller.adminLogin)


module.exports=router


