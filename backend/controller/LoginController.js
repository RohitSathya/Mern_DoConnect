const usermodel=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const login=async(req,res)=>{
    const {username,password}=req.body
    const findname=await usermodel.findOne({username:username})
    if(!findname||findname==''){
        console.log('noname')
        res.json({message:'f'})
    }
    else{
        const match=await bcrypt.compare(password,findname.password)
        if(match){
            const token=jwt.sign({id:findname._id},process.env.JWT_TOKEN,{expiresIn:'1h'})
            if(findname.status=='active'){
                res.json({userdetail:findname,token:token,message:'s'})

            }
            else{
                res.json({message:'f'})

            }

        }
        else{
            res.json({message:'f'})
            console.log('not')
        }

    }
    

}

module.exports={login}