const mongoose=require('mongoose')

const answerSchema=mongoose.Schema({

    userId: { type: String, required: true },
    question:{type:String,required:true},
    likeid:{type:String,default:""},
    answer: { type: String, required: true },
    likes:{type:Number,required:true,default:0},
    timestamp: { type: Date, default: Date.now }
})

const answerModel=mongoose.model('Answer',answerSchema)
module.exports=answerModel