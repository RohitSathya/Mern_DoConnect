const mongoose=require('mongoose')

const commentSchema=mongoose.Schema({

    questionId:{
        type:String
    },
    comment:{
        type:String
    }
},{
    timestamps:true
})

const commentModel=mongoose.model('Comment',commentSchema)
module.exports=commentModel