const express =require('express')
const adminContoller =require('../controller/adminController.js')
const router= express.Router()
  
router.get('/adminLogin', adminContoller.adminGet)
router.post('/adminLogin', adminContoller.adminLogin)
router.post('/adminLogout',adminContoller.adminLogout)
router.post('/adminAdd',adminContoller.addUser)
router.delete('/userDelete/:id',adminContoller.userDelete)
router.post('/adminSearch',adminContoller.userSearch)
router.post('/adminEdit',adminContoller.editUser)


module.exports=router


