const UserModal =require('../models/User')
const auth = require('../middleware/auth')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken')
const Course = require('../models/Course');
const CourseModel = require('../models/Course');
const nodemailer = require('nodemailer');
cloudinary.config({ 
    cloud_name: 'deqjjzjbh', 
    api_key: '618227314277568', 
    api_secret: 'UUvM_uxm9lm5RiaXw_5zgwwlIQs',
    
  });
class FrontController
{
    static dashboard = async(req,res)=> 
    {
         try 
         {
            
            //  console.log('hello')
            const {name,email,id,profile_image,role}= req.emp
            // console.log(role)
             if(role!='admin')
             {
            const btech = await CourseModel.findOne({user_id:id,course:'b.tech'})
            const mca = await CourseModel.findOne({user_id:id,course:'mca'})
            const bca = await CourseModel.findOne({user_id:id,course:'bca'})
            // console.log(btech)
            res.render('dashboard',{n:name,img:profile_image.url,b:btech,bc:bca,mc:mca})
             }
             else
             {
                
                res.redirect('/admindashboard')
             } 
         } 
         catch (error) 
         {
            res.render(error)
        }
    }
    static login = async(req,res)=>
    {
        try 
         {
           
            res.render('login',{message:req.flash('success')})
         } 
         catch (error) 
         {
            res.render(error)
        }
    }
    static userlogin=async(req,res)=>
    {
        try 
        {
            // console.log(req.body)
            const {email,password}=req.body
       
            // console.log(user)
    if(email && password)
        {
            const user = await UserModal.findOne({email:email})
            // console.log(user)
                  if(user != null)
                      {
                        const ismatch = await bcrypt.compare(password,user.password)
                         if(ismatch)
                         {
                            //generate token
                            const token = jwt.sign({ ID: user._id }, 'jyoti@170692');
                            // console.log(token)
                            res.cookie('token',token)
                            
                            res.redirect('/dashboard')
                         }
                         else
                          {
                            req.flash('success','Email and password not valid')
                            res.redirect('/')
                          }
                        
                       
                            
                      }
            
        
                 else
                 {
                    req.flash('success','User not Registor')
                    res.redirect('/')
                 }
        }
        else
        {
                req.flash('success','All Fileds are required')
                res.redirect('/')
        }
}
        
        catch (error)
        {
            console.log(error)
        }
    }
     
    static logout =async(req,res)=>
    {
        try 
        {
            res.clearCookie('token')
            res.redirect('/')
        } 
        catch (error) 
        {
            console.log(error)
        }
    }

    static registration = async(req,res)=>
    {
        try 
         {
           res.render('registration',{message:req.flash('error')})
         } 
         catch (error) 
         {
            
            res.render(error)
        }
    }
    static registrationinsert =async(req,res)=>
    {
        
    //    console.log(req.files.profile_image)
             const file=req.files.profile_image;
             const imageUpload = await cloudinary.uploader.upload(file.tempFilePath,{
                folder:'studentimage'
             })
            //  console.log(imageupload)
            const {name,email,password,confirm_password} = req.body
            const user = await  UserModal.findOne({email:email})            
            if(user)
            {
                req.flash('error','Email already exit')
                res.redirect('/registration')
            }
            else
            {
                if(name && email && password && confirm_password)
                {
                    if(password==confirm_password)
                    {
                        try
                        {
                            console.log(req.body)
                            const hashpassword = await bcrypt.hash(password,10)
                            const result =new UserModal(
                            {
                                name:name,
                                email:email,
                                password:hashpassword,
                                profile_image:
                                {
                                    public_id:imageUpload.public_id,
                                    url:imageUpload.secure_url
                                }
                                
                            });
                            await result.save()
                            this.sendEmail(name,email).catch(console.error)
                            req.flash('success','Registration successfully! Plz Login Here')
                            res.redirect('/')
                        
                    } 
                
                    catch (error) {
                        console.log(error)
                    }
                
                    }
                    else
                    {
                        req.flash('error','Password and Confirm_passsword not match.')
                        res.redirect('/registration')
                    }
                }
                else
                {
                    req.flash('error','All field are required.')
                    res.redirect('/registration')
                }
            }
            
    
    
}
static profile = async(req,res)=>
    {
        try 
        {
            
            const {name,email,id,profile_image,role}= req.emp
            
            res.render('profile',{message:req.flash('success'),n:name,img:profile_image.url,email:email,id:id})
        } catch (error) 
        {
            console.log(error)
        }
    }
    static updateprofile = async(req,res)=>
    {
        // const file=req.files.profile_image;
        // const imageUpload = await cloudinary.uploader.upload(file.tempFilePath,{
        //    folder:'studentimage'
        // })
        
      try
        {
            // console.log(req.files.profile_image)
            if(req.files)
            {
                const update =await UserModal.findById(req.emp.id);
                const image_id=update.profile_image.public_id;
                await cloudinary.uploader.destroy(image_id)

                 
                const file=req.files.profile_image;
                const myimage=await cloudinary.uploader.upload(file.tempFilePath,{
                    folder:"studentimage",
                });
                var data = {
                    name:req.body.name,
                    email:req.body.email,
                    profile_image:
                    {
                        public_id:myimage.public_id,
                        url:myimage.secure_url,
                },
            };
            
        }
        else{
            var data = {
                name:req.body.name,
                email:req.body.email,
                

        }
        }
            const update_profile= await UserModal.findByIdAndUpdate(req.emp.id,data)
             
            
            req.flash('success','profile Update successfully')
            res.redirect('/profile') //login is router name
        } 
      catch (error) 
      {
        console.log(error)
      
      }
    
    }

    static changepassword = async(req,res)=>
    {
        try 
        {
            const {name,email,id,profile_image}=req.emp
            // console.log("hello")
            const {old_password,new_password,confirm_password} = req.body
                 if(old_password && new_password && confirm_password)
                 {
                    const user = await UserModal.findById(id)
                    const ismatch = await bcrypt.compare(old_password,user.password)
                    if(!ismatch)
                    {
                        req.flash('success',"Old password is incorrect")
                        res.redirect('/profile')
                    }
                    else{
                        if(new_password !== confirm_password)
                        {
                            req.flash('success',"Password and confirm password are not match")
                            res.redirect('/profile')
                        }
                        else
                        {
                            const newHashpassword = await bcrypt.hash(new_password,10)
                            await UserModal.findByIdAndUpdate(id,{
                                $set:{password:newHashpassword}
                                
                            })
                            req.flash('success',"password change successfully")
                            res.redirect('/logout')
                        }
                        }
                    
                    
        
                 }
                
                 else
                 {
                    req.flash('success','all fields are required')
                    res.redirect('/profile')
                 }
                
        } 
        catch (error)
         {
          console.log(error)  
        }
    }
    
// async..await is not allowed in global scope, must use a wrapper
    static  sendEmail= async(name,email)=> 
    {
          
                    let transporter = nodemailer.createTransport
                    ({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: false,
                        
                          auth: 
                            {
                                user: 'jsharma921706@gmail.com', // generated ethereal user
                                pass: 'huujmwshyzrpmbjo' // generated ethereal password
                            }
                    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail
    ({
      from: 'jsharma921706@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Now you can Registrates for the course", // Subject line
      text: "Hello?", // plain text body
      html: `<b?>${name}</b> Registration successfully Plz login.`, // html body
    });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};
static about = async(req,res)=>
{
    try 
    {
        
        const {name,email,id,profile_image,role}= req.emp
        
        res.render('about',{n:name,img:profile_image.url,email:email,id:id})
    } catch (error) 
    {
        console.log(error)
    }
} 
 
static contact = async(req,res)=>
{
    try 
    {
        
        const {name,email,id,profile_image,role}= req.emp
        
        res.render('contact',{n:name,img:profile_image.url,email:email,id:id})
    } catch (error) 
    {
        console.log(error)
    }
} 
 
} 


  
  

module.exports = FrontController;