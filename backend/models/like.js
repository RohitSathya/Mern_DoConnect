const mongoose=require('mongoose')

const likeschema=mongoose.Schema({

    questionid:{
        tpye:String
    },
    userid:{
        type:String
    },
    answerid:{
        type:String,
    },
    total:{
        type:Number,
        default:0
    }
})
const likemodel=mongoose.model('Like',likeschema)
module.exports=likemodel