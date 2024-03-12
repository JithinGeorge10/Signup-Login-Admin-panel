const express =require('express')
const adminAuth=require('../middlewares/adminAuth.js')
const adminContoller =require('../controller/adminController.js')
const router= express.Router()
  
router.get('/adminLogin', adminContoller.adminGet)
router.post('/adminLogin', adminContoller.adminLogin)
router.post('/adminLogout',adminContoller.adminLogout)
router.post('/adminAdd',adminContoller.addUser)
router.delete('/userDelete/:id',adminContoller.userDelete)
router.post('/adminSearch',adminContoller.userSearch)
router.get('/adminEdit/:id',adminAuth,  adminContoller.editUser)
router.put('/updateUser/:id',adminContoller.updateUser)
module.exports=router


