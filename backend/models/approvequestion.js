const mongoose=require('mongoose')

const approveSchema=mongoose.Schema({

    userId: { type: String, required: true },
    userName:{type:String,required:true},
    text: { type: String, required: true },
    approval:{type:String,default:false}

})

const approveModel=mongoose.model('ApproveQuestion',approveSchema)
module.exports=approveModel