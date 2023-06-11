const mongoose =require('mongoose')
url='mongodb://127.0.0.1:27017/pra'

const connectDb = ()=>
{
    return mongoose.connect(url)
    .then(()=>
    {
        console.log('successfully connect')
    })
    .catch((error)=>
    {
        console.log(error)
    })

}
module.exports = connectDb