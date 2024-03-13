const usercollection = require("../model/userModel")

const bcrypt = require('bcrypt')


const securePassword = async (password) => {
   try {
      const passwordHash = await bcrypt.hash(password, 10)
      return passwordHash
   } catch (error) {
      console.log(error);
   }
}


const loginGet = async (req, res) => {
   if (req.session.userVerify) {


      res.render('userPages/home', { userDetails: req.session.userDet })
   } else {
      res.render('userPages/login', { signUp: req.session.signup, exists: req.session.Exists, invalidpass: req.session.invalidpass })
      req.session.signup=false
      req.session.Exists = false
      req.session.invalidpass = false
      req.session.save()
   }
}
const signupGet = (req, res) => {
   res.render('userPages/signUp', { exists: req.session.userExist })
   req.session.userExist = false
   req.session.save()
}


const userRegister = async (req, res) => {

   try {

      const bcryptpassword = await securePassword(req.body.password)

      const user = new usercollection({
         name: req.body.name,
         email: req.body.email,
         password: bcryptpassword,
         phone: req.body.phone
      })

      const userExists = await usercollection.findOne({ $or:[{email: req.body.email},{phone:req.body.phone}] })
      if (userExists) {
         req.session.userExist = true
         res.redirect('/signUp')
      } else {
         req.session.signup=true
         await user.save()
        
         res.redirect('/')
      
      }
   }

   catch (error) {
      console.log(error);
   }
}

const loginVerify = async (req, res) => {
   try {
      const userData = await usercollection.findOne({ email: req.body.email })
      if (userData) {
         const passwordMatch = await bcrypt.compare(req.body.password, userData.password)
         if (passwordMatch) {
            req.session.userVerify = true
            req.session.userDet = userData
            res.redirect('/')
         } else {
            req.session.invalidpass = true
            res.redirect('/')
         }
      } else {
         req.session.Exists = true
         res.redirect('/')
      }
   }
   catch (error) {
      console.log(error);
   }
}

const userLogout = (req, res) => {
   req.session.userVerify = false
   res.redirect('/')
}




module.exports = { loginGet, signupGet, userRegister, loginVerify, userLogout }