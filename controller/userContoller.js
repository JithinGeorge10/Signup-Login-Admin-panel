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


const loginGet = (req, res) => {
   if (req.session.userVerify) {
      res.render('userPages/home')
   } else {
      res.render('userPages/login', { signUp: req.session.signup })
      req.session.signup = false
      req.session.save()
   }
}
const signupGet = (req, res) => {
   res.render('userPages/signUp', { exists: req.session.userExist })
   req.session.userExist = false
   req.session.save()
}

const adminLogin = (req, res) => {
   res.render('adminPages/adminLogin')
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

      const userExists = await usercollection.findOne({ email: req.body.email })
      if (userExists) {
         req.session.userExist = true
         res.redirect('/signUp')
      } else {
         await user.save()
         req.session.signup = true
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
            res.redirect('/')
         } else {
            res.redirect('/')
         }
      } else {

         res.redirect('/')
      }
   }
   catch (error) {
      console.log(error);
   }
}

module.exports = { loginGet, signupGet, adminLogin, userRegister, loginVerify }