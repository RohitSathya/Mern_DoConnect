const questionmodel=require('../models/question')

const Aquestion=async(req,res)=>{
    console.log(req.body)
    const {text}=req.body
    

    const find=await questionmodel.find({text:text})
    if(!find||find==''){
        console.log(1)
        const data=await questionmodel.create(req.body)
        res.json({message:'s'})
        
    }
    else{
        console.log(12)
        res.json({message:'f'})
    }
  
  
    

}
const getquestions=async(req,res)=>{
    const data=await questionmodel.find()
    if(!data||data==''){
        res.json({message:'f'})
    }
    else{
        res.json({q:data})
    }

}

module.exports={Aquestion,getquestions}