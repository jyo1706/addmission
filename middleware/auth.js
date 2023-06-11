const jwt = require('jsonwebtoken')
const Usermodal = require('../models/User')

const checkuserauth = async(req,res,next)=>
{
    try{
      // console.log('hello auth');
          const {token} = req.cookies
      // console.log(token)
          if(!token)
         {
            req.flash('success','unauthorized user')
            res.redirect('/')
    
         }
         else
        {
            const verify = jwt.verify(token,'jyoti@170692')
            // console.log(verify)
            const emp = await Usermodal.findOne({_id:verify.ID})
            req.emp =emp
        //    console.log(emp)
           
           next()
        }
    }
    catch(error)
    {
       console.log(error)
    }
}
module.exports = checkuserauth
