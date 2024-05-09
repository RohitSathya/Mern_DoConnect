const usermodel=require('../models/user')

const edit=async(req,res)=>{
    const {uid,username,email}=req.body
    const data=await usermodel.findOneAndUpdate({_id:uid},{username:username,email:email})
    console.log(data)
    res.json({message:'s'})

}

module.exports={edit}