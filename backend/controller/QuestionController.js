const approvequestion=require('../models/approvequestion')


const accept=async(req,res)=>{
    console.log(req.body)
    const {data}=req.body
    const data1=await approvequestion.findByIdAndUpdate({_id:data},{approval:"true"})
    console.log(data1)

}

module.exports={accept}