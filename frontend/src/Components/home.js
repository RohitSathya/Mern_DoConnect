import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './home.css'
import { useState } from 'react'
import { useRef } from 'react';
import dc from '../../src/image/dc.png'
import  io from 'socket.io-client'
export default function home() {
    const socket=io.connect('http://localhost:3000')
    const navigate=useNavigate()
    const [questionText, setQuestionText] = useState('');
    const [message, setMessage] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const messagecontainerRef=useRef(null)
    const [inputMessage, setInputMessage] = useState('');
    const inputMessageRef = useRef(null);
    const [to,sto]=useState()
    const [f,sf]=useState(0)
    const [messages,setmessages]=useState([])
    const [uid,suid]=useState()

    
    useEffect(()=>{
        function fetchid(){
             const ud=localStorage.getItem('userdetail')
             const parse=JSON.parse(ud)
             suid(parse._id)
        }
        fetchid()
    },[])

    useEffect(()=>{
         function g(){
              const ch=localStorage.getItem('token')
              if(!ch||ch==''){
                  navigate('/login')
                   
              }
         }
         g()
    },[])

    async function askquestion(){
         const ud=localStorage.getItem('userdetail')
         const parse=JSON.parse(ud)
         const response=await axios.post(`http://localhost:3000/api/user/question`,{userName:parse.username,text:questionText,userId:parse._id})

    }
    const handleChatClick = () => {
        setShowChat(!showChat); // Toggle chatbox visibility
    };

    const handleMessageSend = async() => {
        if (message.trim() !== '') {
          const ud=localStorage.getItem('userdetail')
          const parse=JSON.parse(ud)
          const res=await axios.post('http://localhost:5000/api/chat/sendmsg',{userId:parse._id,message:message,to:'Admin'})
          const {m}=res.data
          if(m=='s'){
            setMessage('')
            toast.success('Message sent succesfully')
          }




        }
        else{
            toast.warn('Message cant be empty')
        }
    };
    useEffect(()=>{
        if (messagecontainerRef.current) {
          messagecontainerRef.current.scrollTop = messagecontainerRef.current.scrollHeight;
        }
    
       },[messages])
       async function viewchat(e){
        sto(e)
        console.log(e)
        const m1=document.getElementById('m1');
        m1.style.display='block'
         const res=await axios.get(`http://localhost:3000/api/chat/getmsgU/${e}`)
         const {m}=res.data
         if(m=='f'){
            sf(0)
            setmessages([])
         }
         else{
            setmessages(res.data)

         }
      

       }
       async function sendMessage(){
        if (inputMessage.trim() === '') {
            toast.warn('Please enter a message');
            return;
        }
    
        const res=await axios.post('http://localhost:3000/api/chat/sendmsg',{userId:uid,message:inputMessage,to:'Admin'})
        const {m}=res.data
        if(m=='s'){
            
            
        
            
        setInputMessage(''); 
        inputMessageRef.current.focus(); 
        const res2=await axios.get(`http://localhost:3000/api/chat/getmsgU/${uid}`)
        setmessages(res2.data)
      
     
    
        }
    
        
     }
   

  return (
    <>
      <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <img src={dc} width='50%'></img>
                    <ul className="nav-links">
                    <li><button onClick={()=>viewchat(uid)}>Chat With Support</button></li>
                    {showChat && ( // Render chatbox if showChat is true
                <div className="chatbox-container">
                    <div className="chatbox">
                        <div className="chatbox-header">
                            <h3>Support</h3>
                            <button className="close-button" onClick={handleChatClick}>Close</button>
                        </div>
                        <div className="chatbox-messages">
                            {chatHistory.map((msg, index) => (
                                <div key={index} className={`message ${msg.sender}`}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className="chatbox-input">
                            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
                            <button onClick={handleMessageSend}>Send</button>
                        </div>
                    </div>
                </div>
            )}
                    <li><button onClick={()=>navigate('/search')}>Search</button></li>
                        <li><button onClick={()=>navigate('/questions')}>Question</button></li>
                        <li><button onClick={()=>navigate('/askquestion')}>Ask Question</button></li>
                        <li><button onClick={() => navigate('/login')}>Logout</button></li>
                    </ul>
                </div>
            </nav>
         
        </div>
        <div className='m2'  id='m1' ref={messagecontainerRef}>
                <button  className="bg-red-500 text-white py-2 px-4 ml-2 rounded-md hover:bg-red-600 focus:outline-none" onClick={()=>{const m1=document.getElementById('m1');
        m1.style.display='none'}}>X</button>
     
     {
       messages.map((m)=>{
          return(
             <div>
                <div className={`message${m.fromSelf  ? "sended":"recieved"}`} >
                   <div className={`content${m.fromSelf  ? "sended":"recieved"}`}>
                     <b style={{paddingLeft:'16px'}} >{m.message} </b>
                   </div>
                </div>
             </div>
          )
     })
   }
    <div className="flex justify-between items-center px-4 py-2 bg-gray-200 fixed bottom-0 left-0 right-0">
                <input 
                    type="text" 
                    value={inputMessage} 
                    onChange={(e) => setInputMessage(e.target.value)} 
                    placeholder="Type your message..." 
                    className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                    ref={inputMessageRef}
                />
                <button 
                    onClick={sendMessage} 
                    className="bg-blue-500 text-white py-2 px-4 ml-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Send
                </button>
            </div>


   </div>
  
    </>
  )
}
