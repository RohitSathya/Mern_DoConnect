import React, { useState } from 'react';
import axios from 'axios';
import './home.css';
import { useNavigate } from 'react-router-dom';
import CommentDialogue from './CommentDialogue'
import dc from '../../src/image/dc.png'

export default function Search() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [qa, setQA] = useState([]);
  const [answers, setAnswers] = useState([]); // Initialize as an array
  const [f, setF] = useState(0);
  const [qid, setQid] = useState([]);
  const [lc, setLc] = useState(0);
  const [cmt, setCmt] = useState('');
  const [cmtList, setCmtList] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [count,setcount]=useState(0)
  const [uid,suid]=useState()
  async function sub() {
    const response = await axios.post('https://mern-do-connectback-ky47u3jyg-rohits-projects-a5c6d24a.vercel.app/api/user/qa', { question: text });
    const { qa, message } = response.data;

    

    if (message === 'f') {
      setF(0);
    } else {
      setF(1);
      setQA(qa);
      const ans = qa.map(i => i.answer);
      const id = qa.map(i => i._id);
      setQid(id);
      setAnswers(ans);
    }
  }

  async function like(e) {
   
    setLc(count+1)
    setcount(lc)
    
  }

  async function addComment(e, a) {
    console.log(e, a);
    const res = await axios.post('https://mern-do-connectback-ky47u3jyg-rohits-projects-a5c6d24a.vercel.app/api/user/addcmt', { questionId: e, comment: a });
    const { message } = res.data;
    if (message === 's') {
      setAnswers('')
    }
  }

  async function getComment(e) {
    const res = await axios.get(`https://mern-do-connectback-ky47u3jyg-rohits-projects-a5c6d24a.vercel.app/api/user/getcmt/${e}`);
    setCmtList(res.data);
    setShowComments(true); // Show comments after fetching
  }

  return (
    <>
      <div>
        <nav className="navbar">
          <div className="navbar-container">
          <img src={dc} width='50%'></img>
            <ul className="nav-links">
            <li><button onClick={()=>navigate('/home')}>Home</button></li>

              <li><button onClick={() => navigate('/search')}>Search</button></li>
              <li><button onClick={() => navigate('/questions')}>Question</button></li>
              <li><button onClick={() => navigate('/askquestion')}>Ask Question</button></li>
              <li><button onClick={() => navigate('/login')}>Logout</button></li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="flex justify-center items-center h-full">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Search Component</h2>
          <div className="flex">
            <input
              type="text"
              placeholder="Search..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded-l-md py-2 px-4 bg-gray-100 focus:outline-none focus:bg-white border border-gray-200"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md" onClick={sub}>
              Search
            </button>
          </div>
          {f === 1 ? (
            <div>
              <h3 className="text-lg font-semibold mt-4">Answers:</h3>
              <ul className="list-disc pl-6">
                {qa.map((item, index) => (
                  <li key={index} className="mt-2">
                    {item.answer} <button onClick={() => like(item._id)}>❤️</button>{lc}
                    <input
                      type='text'
                      style={{ backgroundColor: 'gray', color: 'black' }}
                      value={answers[item._id] || ''}
                      onChange={(e) => setAnswers({ ...answers, [item._id]: e.target.value })}
                    />
                    <button onClick={() => addComment(item._id, answers[item._id])}>Add Comment</button>
                    <button onClick={() => getComment(item._id)}>Get Comment</button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (<><h1>No answer for this question yet</h1></>)}
          {showComments && <CommentDialogue comments={cmtList} onClose={() => setShowComments(false)} />}
        </div>
      </div>
      
    </>
  );
}
