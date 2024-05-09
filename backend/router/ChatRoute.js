const express=require('express')
const router=express.Router()

const chatcontroller=require('../controller/Chatcontroller')

router.get('/getusers',chatcontroller.getusers)
router.post('/sendmsg',chatcontroller.send)
router.get('/getmsg/:id',chatcontroller.get)
router.get('/getmsgU/:id',chatcontroller.getU)

module.exports=router