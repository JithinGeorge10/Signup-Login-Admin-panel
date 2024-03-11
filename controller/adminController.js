const usercollection = require("../model/userModel")
const bycrypt = require('bcrypt')


const adminGet = async (req, res) => {
    if (req.session.logged) {

        if (req.session.search) {

            res.render('adminPages/adminHome', { userdetails: req.session.search })
            req.session.search = false
            return req.session.save()
        }
        const userData = await usercollection.find()
        res.render('adminPages/adminHome', { userdetails: userData })
        req.session.userAdd = false
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
            res.status(208).send({ emailExists: true })
        } else {
            req.session.userAdd = true
            newUser.save();
            res.status(200).send({ success: true })

        }
    } catch (error) {
        console.log(error);
    }
};

const userDelete = async (req, res) => {
    try {
        // console.log(req.params.id);
        // const doc=await usercollection.findOne({_id:req.params.id})
        // console.log(doc);
        await usercollection.deleteOne({ _id: req.params.id })
        res.status(200).send({ success: true })
    } catch (err) {
        console.log(err);
    }
}

const userSearch = async (req, res) => {
    try {
        const searchedhUsers = await usercollection.find({
            name: { $regex: req.body.search, $options: 'i' },
        })
        req.session.search = searchedhUsers
        res.redirect('/adminLogin')

    } catch (err) {
        console.log(err);
    }
}

const editUser = async (req, res) => {
    try {
      
        console.log(req.body);
        // req.session.userEdit = true
        // editedUser.save();
        // res.status(200).send({ success: true })


    } catch (err) {
        console.log(RangeError);
    }
}
module.exports = { adminGet, adminLogin, adminLogout, addUser, userDelete, userSearch, editUser }




