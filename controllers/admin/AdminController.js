
const CourseModel = require('../../models/Course')
class AdminController
{
  static admindashboard = async(req,res)=>
  {
    try 
    {
      const {name,email,id,profile_image,role}= req.emp
    // console.log('hello')
      const display = await CourseModel.find()
      // console.log(display)
      res.render('admin/admindashboard',{d:display,n:name,img:profile_image.url})
    } 
    catch (error) 
    {
      console.log(error)
    }
  }
  static updateapprove = async(req,res)=>
  {
    try 
    {
    const result =await CourseModel.findByIdAndUpdate(req.params.id,{
      comment:req.body.comment,
      status:req.body.status,
    })
    res.redirect('/admindashboard')
    } 
    catch (error) {
      console.log(error)
    }

  }
}
module.exports =AdminController