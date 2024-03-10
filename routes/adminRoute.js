const express =require('express')
const adminContoller =require('../controller/adminController.js')
const router= express.Router()
  
router.get('/adminLogin', adminContoller.adminGet)
router.post('/adminLogin', adminContoller.adminLogin)
router.post('/adminLogout',adminContoller.adminLogout)
router.post('/adminAdd',adminContoller.addUser)




module.exports=router


