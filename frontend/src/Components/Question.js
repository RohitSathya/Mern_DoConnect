import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
import './home.css'
import dc from '../../src/image/dc.png'
export default function Question() {
  const [questions, setQuestions] = useState([]);
  const [hasQuestions, setHasQuestions] = useState(false);
  const [uid,suid]=useState()
  
  
  const [answers, setAnswers] = useState({});
  const navigate=useNavigate()

  const setAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };


  useEffect(() => {
    async function getQuestions() {
      try {
        const response = await axios.get('http://localhost:3000/api/user/getquestion');
        const { data } = response;
        
        if (data.message === 'f') {
          setHasQuestions(false);
        } else {
          setHasQuestions(true);
          setQuestions(data.q); // Assuming 'q' contains an array of questions
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }

    getQuestions();
  }, []);
 
  async function sub(q,a){
 

    const answer = answers[a];
    console.log(q,answer)
    const ud=localStorage.getItem('userdetail')
    const parse=JSON.parse(ud)

    const res=await axios.post('http://localhost:3000/api/user/answer',{userId:parse._id,question:q,answer:answer})
    const {message}=res.data
    if(message=='s'){
      toast.success('Answer Posted Succesfully')
      navigate('/home')

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
    <ToastContainer />
     <div>
      {hasQuestions ? (
        <>
        
        {questions.map((question) => (
        <div key={question._id}>
          <h2>{question.text}</h2>
          <input
            type='text'
            value={answers[question._id] || ''}
            onChange={(e) => setAnswer(question._id, e.target.value)}
          />
          <button onClick={() => sub(question.text,question._id)}>Submit Answer</button>
        </div>
      ))}
        </>
      ) : (
        <h1>No Questions Found</h1>
      )}
    </div>
    
    </>
   
  );
}
