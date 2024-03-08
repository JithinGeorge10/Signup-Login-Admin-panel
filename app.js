const express = require('express')
const session = require('express-session')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


require('dotenv').config()
require('./config/dbConnect.js')
const userRouter = require('./routes/userRoute.js')


app.set('view engine', 'ejs')

app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))
app.use(userRouter)



app.listen(3000, () => console.log('port started'))