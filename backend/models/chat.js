const mongoose=require('mongoose')

const chatSchema=mongoose.Schema({

    userId:{
        type:String
    },
    message:{
        type:String
    },
    users:Array,
},{
    timestamps:true
})
const chatModel=mongoose.model('Chat',chatSchema)
module.exports=chatModel