const mongoose =require('mongoose')

//schema
const Userschema = new mongoose.Schema({
    name:
    {
        type:String,
        required:true,
    },
    email:
    {
        type:String,
        required:true,
    },
    password:
    {
        type:String,
        required:true,
    },
    profile_image:    
    {
      public_id: {
        type: String,
        
      },
      url: {
        type: String,
         
      },
    },
    role:
    {
      type:String,
     default:'student'
    }
    
    
},{timestamps:true})

//define collection

const UserModal = new mongoose.model('user',Userschema)
module.exports =UserModal