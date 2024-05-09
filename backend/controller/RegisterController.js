const usermodel=require('../models/user')
const bcrypt=require('bcrypt')
const nodemailer=require('nodemailer')


const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"spiritroyo2336@gmail.com",
        pass:"xtdekcpwnjsspsip"
        
    }
})
const register=async(req,res)=>{
    console.log(req.body)
    const {username,password,email}=req.body
    const gensalt=await bcrypt.genSalt(10)
    const hp=await bcrypt.hash(password,gensalt)
    const findemail=await usermodel.findOne({email:email})
    if(!findemail || findemail==''){
        const data=await usermodel.create({username:username,password:hp,email:email})
        console.log(data)

        res.json({message:'s'})
        const mailOptions = {
            from: 'spiritroyo2336@gmail.com', // replace with your Gmail email
            to: email,
            subject: 'Welcome to Doconnect App',
            text: 'Registration Successful'
          };
          transport.sendMail(mailOptions,(error,info)=>{
             if(error){
                console.log(error)
             }
             else{
                console.log('email send'+info.response)
             }
          })
    }
    else{
        res.json({message:'f'})
    }

}

module.exports={register}