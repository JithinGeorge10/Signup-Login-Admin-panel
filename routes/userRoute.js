const express =require('express')
const userContoller =require('../controller/userContoller.js')
const userAuth=require('../middlewares/userAuth.js')
const router= express.Router()
  

router.get('/', userContoller.loginGet)
router.get('/signUp',userAuth,userContoller.signupGet)
router.post('/signUp',userContoller.userRegister)
router.post('/login', userContoller.loginVerify)
router.post('/logout', userContoller.userLogout)


module.exports=router


