const approvequestion=require('../models/approvequestion')

const getquestion=async(req,res)=>{
    console.log('34')
    const data=await approvequestion.find()
    if(!data||data==''){
        res.json({message:'f'})
    }
    else{
        res.json({ap:data})
    }
 


}

module.exports={getquestion}