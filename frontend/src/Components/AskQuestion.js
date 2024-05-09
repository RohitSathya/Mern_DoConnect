import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import './home.css'
import 'react-toastify/dist/ReactToastify.css';
import dc from '../../src/image/dc.png'

export default function AskQuestion() {

    const[text,settext]=useState('')
    const[title,settitle]=useState('')
    const navigate=useNavigate()
    
    async function sub(){
      
        const ud=localStorage.getItem('userdetail')
        const parse=JSON.parse(ud)
        const res=await axios.post('http://localhost:3000/api/user/question',{userId:parse._id,text:text,title:title})
        const {message}=res.data
        if(message=='f'){
          toast.warn('Question Already There!!!')
          settext('')
          settitle('')
        }
        else{
          toast.success('Question Posted Successfully')
          settext('')
          settitle('')
        }
    }



    
  return (
    <>
     <div>
            <nav className="navbar">
                <div className="navbar-container">
                <img src={dc} width='50%'></img>
                    <ul className="nav-links">
                    <li><button onClick={()=>navigate('/home')}>Home</button></li>
                    <li><button onClick={()=>navigate('/search')}>Search</button></li>
                        <li><button onClick={()=>navigate('/questions')}>Question</button></li>
                        <li><button onClick={()=>navigate('/askquestion')}>Ask Question</button></li>
                        <li><button onClick={() => navigate('/login')}>Logout</button></li>
                    </ul>
                </div>
            </nav>
         
        </div>
    <ToastContainer/>
    <h1>Ask a Question</h1><br/>
    <input type='text' placeholder='Title' value={title} onChange={(e)=>settitle(e.target.value)}></input><br/>
    <input type='text' placeholder='Ask a Question' value={text} onChange={(e)=>settext(e.target.value)}></input><br/>
    <button onClick={sub}>Submit</button>
    
    </>
  )
}
