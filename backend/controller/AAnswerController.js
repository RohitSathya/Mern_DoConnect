const answermodel=require('../models/answer')
const likemodel=require('../models/like')
const commentmodel=require('../models/Comment')
const answer=async(req,res)=>{
    const data=await answermodel.create(req.body)
    res.json({message:'s'})

}
const getQA=async(req,res)=>{
    const {question}=req.body
    const data=await answermodel.find({question:question})
    if(!data||data==''||data==[]){
        res.json({message:'f'})
    }
    else{
        res.json({qa:data})

    }
   
    console.log(data)
}
const getQAA=async(req,res)=>{
    const data=await answermodel.find()
    if(!data || data==''){
        res.json({message:'f'})
    }
    else{
        res.json({qaa:data})
    }

}
const deleteQA=async(req,res)=>{
    const id=req.params.id
    console.log(id)
    const data2=await answermodel.findByIdAndDelete({_id:id})
    res.json({message:'s'})
   

}
const approveQA=async(req,res)=>{

}
const updateQA=async(req,res)=>{
    const {question,answer,id}=req.body
    const data=await answermodel.findByIdAndUpdate({_id:id},{question:question,answer:answer})
    console.log(data)
    res.json({message:'s'})

}
const like=async(req,res)=>{
    const {questionid,userid}=req.body
    const find=await likemodel.find()
    if(!find||find==''){
        const data=await likemodel.create({questionid:questionid,userid:userid,total:1})
        res.json({total:1})

    }
    else{
        const check=await likemodel.findOne({userid:userid})
        if(!check||check==''){
            const getotal=check.total
            const data2=await likemodel.create({questionid:questionid,userid:userid,total:getotal+1})
            res.json({total:data2.total})
        }
        else{
            res.json({message:'f'})
        }
    }

}
const addcmt=async(req,res)=>{
    const data=await commentmodel.create(req.body)
    res.json({message:'s'})

}
const getcmt=async(req,res)=>{
    const id=req.params.id
    const data=await commentmodel.find({questionId:id})
    const cmts=data.map((d)=>d.comment)
    console.log(cmts)
    res.json(cmts)

}
module.exports={answer,getQA,getQAA,deleteQA,approveQA,updateQA,like,addcmt,getcmt}