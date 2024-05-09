import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@mui/material';
import './chatuser.css'
import { useRef } from 'react';
export default function ChatUsers() {
    const [allUser, setAllUser] = useState([]);
    const [message,setmessage]=useState([])
    const navigate=useNavigate()
    const messagecontainerRef=useRef(null)
    const [inputMessage, setInputMessage] = useState('');
    const inputMessageRef = useRef(null);
    const [to,sto]=useState()
    const [f,sf]=useState(0)

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get('http://localhost:3000/api/admin/getuser');
                const { message, ud } = response.data;
                if (message === 'f') {
                    toast.error('No users available');
                } else {
                    setAllUser(ud);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchUser();
    }, []);
    useEffect(()=>{
        if (messagecontainerRef.current) {
          messagecontainerRef.current.scrollTop = messagecontainerRef.current.scrollHeight;
        }
    
       },[message])

       async function viewchat(e){
        sto(e)
        const m1=document.getElementById('m1');
        m1.style.display='block'
         const res=await axios.get(`http://localhost:3000/api/chat/getmsg/${e}`)
         const {m}=res.data
         console.log(res.data)
         if(m=='f'){
            sf(0)
            setmessage([])
         }
         else{
            setmessage(res.data)

         }
      

       }
 async function sendMessage(){
    if (inputMessage.trim() === '') {
        toast.warn('Please enter a message');
        return;
    }

    const res=await axios.post('http://localhost:3000/api/chat/sendmsg',{userId:'Admin',message:inputMessage,to:to})
    const {m}=res.data
    if(m=='s'){
        
    setInputMessage(''); 
    inputMessageRef.current.focus(); 
    const res2=await axios.get(`http://localhost:3000/api/chat/getmsg/${to}`)
    setmessage(res2.data)

    }

    
 }

    

    return (
        <>
            <ToastContainer />
            <div className="bg-gradient-to-b from-purple-100 to-white min-h-screen">
                <div className="container mx-auto p-8">
                    <h1 className="text-3xl font-semibold mb-4">All Users</h1>
                    <table className="w-full border border-collapse border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 border-r">ID</th>
                                <th className="py-2 px-4 border-r">Name</th>
                                <th className="py-2 px-4 border-r">Email</th>
                                <th className="py-2 px-4 border-r">Chat</th>
                              
                               
                            </tr>
                        </thead>
                        <tbody>
                            {allUser.map((user, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="py-2 px-4 border-r">{index + 1}</td>
                                    <td className="py-2 px-4 border-r">{user.username}</td>
                                    <td className="py-2 px-4 border-r">{user.email}</td>
                                   
                                    <button className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none" onClick={()=>viewchat(user._id)}>
                                           Chat User
                                        </button>
                                 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='m3'  id='m1' ref={messagecontainerRef}>
                <button  className="bg-red-500 text-white py-2 px-4 ml-2 rounded-md hover:bg-red-600 focus:outline-none" onClick={()=>{const m1=document.getElementById('m1');
        m1.style.display='none'}}>X</button>
        
     
     {
       message.map((m)=>{
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
    );
}
