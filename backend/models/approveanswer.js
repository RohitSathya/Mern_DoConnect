const mongoose=require('mongoose')

const approveanswerSchema=mongoose.Schema({

    userId: { type: String, required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
})

const approveanswerModel=mongoose.model('Answer',approveanswerSchema)
module.exports={approveanswerModel}