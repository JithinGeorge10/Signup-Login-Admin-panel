const usercollection = require("../model/userModel")
const bycrypt = require('bcrypt')


const adminGet = async (req, res) => {
    if (req.session.logged) {
        const userData = await usercollection.find()
        res.render('adminPages/adminHome', { userdetails: userData })
        req.session.userAdd=false
    } else {
        res.render('adminPages/adminLogin', { invalid: req.session.invalid })
        req.session.invalid = false
        req.session.save()
    }
}


const adminLogin = async (req, res) => {
    try {
        const credentials = { email: process.env.EMAIL, password: process.env.PASSWORD }
        if (credentials.email == req.body.email && req.body.password == credentials.password) {
            req.session.logged = true
            res.redirect('/adminLogin')
        } else {
            req.session.invalid = true
            res.redirect('/adminLogin')
        }
    }
    catch (error) {
        console.log(error);
    }
}

const adminLogout = async (req, res) => {
    try {
        req.session.logged = false
        res.redirect('/adminLogin')

    } catch (error) {
        console.log(error);
    }
}


const addUser = async (req, res) => {
    console.log(req.body);
    try {
        const encryptedPassword = bycrypt.hashSync(req.body.password, 10);
        const newUser = new usercollection({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: encryptedPassword,
        });
        const checkEmail = await usercollection.findOne({ email: req.body.email });
        if (checkEmail) {
         res.status(208).send({emailExists:true})
        } else {
            req.session.userAdd=true
            newUser.save();
            res.status(200).send({success:true})
            
        }
    } catch (error) {
        console.log(error);
    }
};



module.exports = { adminGet, adminLogin, adminLogout, addUser }




