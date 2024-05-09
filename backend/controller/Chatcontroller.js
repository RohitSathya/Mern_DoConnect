const chatModel=require('../models/chat')

const getusers=async(req,res)=>{
   

}

const send=async(req,res)=>{
    const {userId,message,to}=req.body
    const data=await chatModel.create({userId:userId,users:[userId,to],message:message})
    res.json({m:'s'})

}

const get=async(req,res)=>{
    const id=req.params.id
    const data=await chatModel.find({ users:{
        $all:[id,'Admin']
    }})
    if(!data||data==''){
        res.json({m:'f'})
    }
    else{
        const promessage=data.map((m)=>{
            return{
                 fromSelf:m.userId.toString()==='Admin',
                 message:m.message
            }
        })
        res.json(promessage)

    }
  
    

}
const getU=async(req,res)=>{
    const id=req.params.id
    console.log(id)
    const data=await chatModel.find({ users:{
        $all:['Admin',id]
    }})
   
    if(!data||data==''){
        res.json({m:'f'})
    }
    else{
        const promessage=data.map((m)=>{
            return{
                 fromSelf:m.userId.toString()===id,
                 message:m.message
            }
        })
        res.json(promessage)

    }
  
    

}
module.exports={getusers,send,get,getU}