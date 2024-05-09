const usermodel=require('../models/user')

const removeuser=async(req,res)=>{
    const id=req.params.id
    const remove=await usermodel.findByIdAndDelete({_id:id})
    res.json({message:'s'})
   

}

module.exports={removeuser}