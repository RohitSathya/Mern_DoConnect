const mongoose=require('mongoose')

const questionSchema=mongoose.Schema({

    userId: { type: String, required: true },
    text: { type: String, required: true },
    title:{type:String,required:true},
    timestamp: { type: Date, default: Date.now }
})

const questionModel=mongoose.model('Question',questionSchema)
module.exports=questionModel