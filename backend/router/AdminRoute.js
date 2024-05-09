const express=require('express')
const router=express.Router()

const getusercontroller=require('../controller/GetUsersController')
const removeusercontroller=require('../controller/RemoveUserController')
const getquestioncontroller=require('../controller/GetQuestionController')
const questioncontroller=require('../controller/QuestionController')
const editcontroller=require('../controller/editusercontroller')
const activecontroller=require('../controller/ActiveController')

router.get('/getuser',getusercontroller.getuser)
router.get('/getquestion',getquestioncontroller.getquestion)
router.delete('/removeuser/:id',removeusercontroller.removeuser)
router.post('/questionapproval',questioncontroller.accept)
router.post('/active',activecontroller.active)
router.post('/edituser',editcontroller.edit)





module.exports=router