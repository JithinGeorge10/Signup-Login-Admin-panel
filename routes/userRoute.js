const express =require('express')
const userContoller =require('../controller/userContoller.js')
const router= express.Router()
  

router.get('/', userContoller.loginGet)
router.get('/signUp',userContoller.signupGet)
router.get('/adminLogin',userContoller.adminLogin)
router.post('/signUp',userContoller.userRegister)
router.post('/login', userContoller.loginVerify)
module.exports=router


