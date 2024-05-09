import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/home'
import Register from './Components/register'
import Login from './Components/login'
import Profile from './Components/profile'
import Admindashboard from './Components/admindashboard'
import Search from './Components/Search'
import AllUsers from './Components/AllUsers'
import ApproveAnswer from './Components/ApproveAnswer'
import ApproveQuestion from './Components/ApproveQuestion'
import AskQuestion from './Components/AskQuestion'
import Question from './Components/Question'
import ChatUsers from './Components/ChatUsers'
function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/search' element={<Search/>}></Route>
      <Route path='/askquestion' element={<AskQuestion/>}></Route>
      <Route path='/questions' element={<Question/>}></Route>
      <Route path='/chatuser' element={<ChatUsers/>}></Route>


      <Route path='/admindashboard' element={<Admindashboard/>}></Route>
      <Route path='/admindashboard/allusers' element={<AllUsers/>}></Route>
      <Route path='/admindashboard/approveQ' element={<ApproveQuestion/>}></Route>
      <Route path='/admindashboard/approveA' element={<ApproveAnswer/>}></Route>

    </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
