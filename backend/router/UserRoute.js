const express=require('express')
const router=express.Router()
const logincontroller=require('../controller/LoginController')
const registercontroller=require('../controller/RegisterController')

const Aquestioncontroller=require('../controller/AQuestionController')
const AAnswerController=require('../controller/AAnswerController')


router.post('/login',logincontroller.login)
router.post('/register',registercontroller.register)

router.post('/question',Aquestioncontroller.Aquestion)
router.get('/getquestion',Aquestioncontroller.getquestions)
router.post('/answer',AAnswerController.answer)
router.post('/qa',AAnswerController.getQA)
router.get('/qaa',AAnswerController.getQAA)
router.delete('/deleteqa/:id',AAnswerController.deleteQA)
router.post('/approveqa/:id',AAnswerController.approveQA)
router.post('/updateqa/',AAnswerController.updateQA)
router.post('/like',AAnswerController.like)
router.post('/addcmt',AAnswerController.addcmt)
router.get('/getcmt/:id',AAnswerController.getcmt)


module.exports=router
