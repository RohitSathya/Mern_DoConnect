const usermodel=require('../models/user')

const active=async(req,res)=>{
    const {id,s}=req.body
    console.log(id,s)
    const data=await usermodel.findByIdAndUpdate({_id:id},{status:s})
    res.json({message:'s'})
    console.log(data)

}
module.exports={active}