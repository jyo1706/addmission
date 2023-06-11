const express=require('express')
const router = express.Router()
const FrontControllers = require('../controllers/FrontControllers')
const CourseController = require('../controllers/CourseControllers')
const AdminController = require('../controllers/admin/AdminController')
const checkuserauth = require('../middleware/auth')
const islogin = require('../middleware/islogin')

router.get('/',islogin,FrontControllers.login)
router.get('/registration',FrontControllers.registration)
router.post('/registrationinsert',FrontControllers.registrationinsert)
router.get('/dashboard',checkuserauth,FrontControllers.dashboard)
router.post('/user/login',FrontControllers.userlogin)
router.get('/logout',FrontControllers.logout)
router.get('/about',checkuserauth,FrontControllers.about)
router.get('/contact',checkuserauth,FrontControllers.contact)
//courses Controller

router.post('/insert',checkuserauth,CourseController.insert)
router.get('/course_display',checkuserauth,CourseController.course_display)
router.get('/course_view/:id',checkuserauth,CourseController.course_view)
router.get('/course_edit/:id',checkuserauth,CourseController.edit)
router.post('/update/:id',checkuserauth,CourseController.update)
router.get('/course_delete/:id',checkuserauth,CourseController.delete)

router.get('/profile',checkuserauth,FrontControllers.profile)
router.post('/updateprofile/:id',checkuserauth,FrontControllers.updateprofile)
router.post('/changepassword/:id',checkuserauth,FrontControllers.changepassword)

//Admin Controller
router.get('/admindashboard',checkuserauth,AdminController.admindashboard)
router.post('/updateapprove/:id',checkuserauth,AdminController.updateapprove)
module.exports = router