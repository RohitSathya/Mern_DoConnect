const usermodel=require('../models/user')

const getuser=async(req,res)=>{

    const data=await usermodel.find()
    if(!data||data==''){
        res.json({message:'f'})
    }
    else{
        res.json({ud:data})
    }

}
module.exports={getuser}