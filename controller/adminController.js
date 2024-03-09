
const adminGet = (req, res) => {
    if (req.session.logged) {
        res.render('adminPages/adminHome')
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



module.exports = { adminGet, adminLogin }




