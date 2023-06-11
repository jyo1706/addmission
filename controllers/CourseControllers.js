const CourseModel = require('../models/Course')

class CourseController
{
    static insert = async(req,res)=>
    {
        try 
        {
            const result = new CourseModel(
            {

               name:req.body.name,
               email:req.body.email,
               number:req.body.number,
               address:req.body.address,
               gender:req.body.gender,
               qualification:req.body.qualification,
               course:req.body.course,
               user_id:req.emp.id,
            })
            await result.save()
            req.flash('success','insert successfully')
            res.redirect('/course_display') //login is router name
        } 
        catch (error) 
        {
            console.log(error)
        }
    }

    static course_display = async(req,res)=>
    {
         try 
         {
            const {name,email,id,profile_image}= req.emp
            
            const data = await CourseModel.find({user_id:id})
            
            res.render('courses/display',{d:data,message:req.flash('success'),n:name,img:profile_image.url})
         } 
         catch (error) 
         {
            console.log(error)
         }
    }
    static course_view = async(req,res)=>
    {
        try 
        {
            // console.log(req.params.id)
            const data =await CourseModel.findById(req.params.id)
            const {name,email,id,profile_image}= req.emp
            res.render('courses/view',{d:data,n:name,img:profile_image.url})
        } 
        catch (error) 
        {
            console.log(error)
        }
    }
    static edit = async(req,res)=>
    {
       try 
       {
        const data =await CourseModel.findById(req.params.id)
        const {name,email,id,profile_image}= req.emp
          res.render('courses/edit',{d:data,n:name,img:profile_image.url})
       } 
       catch (error) 
       {
        console.log(error)
       }
    }
    static update = async(req,res)=>
    {
      try
        {
            const update =await CourseModel.findByIdAndUpdate(req.params.id,
            {
                name:req.body.name,
                email:req.body.email,
                number:req.body.number,
                address:req.body.address,
                gender:req.body.gender,
                qualification:req.body.qualification,
                course:req.body.course,
            })
       
            req.flash('success','Update successfully')
            await update.save()
            res.redirect('/course_display') //login is router name
        } 
      catch (error) 
      {
        console.log(error)
      
      }
    }
    static delete = async(req,res)=>
    {
        try 
        {
           await CourseModel.findByIdAndDelete(req.params.id)
           req.flash('success','delete successfully')
            res.redirect('/course_display')
        } 
        catch (error) 
        {
            console.log(error)
        }
    }
}

module.exports = CourseController