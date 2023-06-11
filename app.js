const express = require('express')
const app = express()
const port = 2000
const web = require('./routes/web')
const connectDb = require('./db/connectDb')
const flash=require('connect-flash')
const session=require('express-session')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')

//file upload
app.use(fileUpload({useTempFiles:true}))

// call cookie
app.use(cookieParser())
// show message 
app.use(session({
    secret:'secret',
    cookie:{maxAge:60000},
    resave:false,
    saveUninitialized:false,
}));

app.use(flash());
app.use(express.urlencoded({extended:true}))
connectDb()
app.set('view engine','ejs')

//calling routes
app.use('/',web)

//static files
app.use(express.static('public'))

//create server
app.listen(port,()=>
{
    console.log(`server is running ${port}`)
})