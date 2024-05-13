import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



export default function ApproveQuestion() {
  const [f, sf] = useState(0);
  const [allquestion, setQuestion] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [qid,sqid]=useState()
  const navigate=useNavigate()
  
  useEffect(() => {
    async function getQuestions() {
      const res = await axios.get('https://mern-do-connectback-ky47u3jyg-rohits-projects-a5c6d24a.vercel.app/api/user/qaa');
      const { message, qaa } = res.data;
      if (message === 'f') {
        sf(0);
      } else {
        setQuestion(qaa);
        sf(1);
      }
    }
    getQuestions();
  }, []);

  async function decline(id) {
    const res1 = await axios.delete(`https://mern-do-connectback-ky47u3jyg-rohits-projects-a5c6d24a.vercel.app/api/user/deleteqa/${id}`);
    const { message } = res1.data;
    if (message === 's') {
      const res = await axios.get('https://mern-do-connectback-ky47u3jyg-rohits-projects-a5c6d24a.vercel.app/api/user/qaa');
      const { message, qaa } = res.data;
      if (message === 'f') {
        sf(0);
      } else {
        setQuestion(qaa);
        sf(1);
      }
    }
  }

  function openModal(question) {
    setCurrentQuestion(question);
    setModalOpen(true);
  }

  async function update(id, updatedQuestion) {
    console.log('update');
    const res3 = await axios.post('https://mern-do-connectback-ky47u3jyg-rohits-projects-a5c6d24a.vercel.app/api/user/update', updatedQuestion);
    // Close modal after updating
    setModalOpen(false);
  }

  return (
    <>
      {f === 0 ? (
        <>Empty</>
      ) : (
        <>
          <ToastContainer />
          <div className="bg-gradient-to-b from-purple-100 to-white min-h-screen">
            <div className="container mx-auto p-8">
              <h1 className="text-3xl font-semibold mb-4">Approval Question</h1>
              <table className="w-full border border-collapse border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-4 border-r">ID</th>
                    <th className="py-2 px-4 border-r">Question</th>
                    <th className="py-2 px-4 border-r">Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {allquestion.map((user, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                      <td className="py-2 px-4 border-r">{index + 1}</td>
                      <td className="py-2 px-4 border-r">{user.question}</td>
                      <td className="py-2 px-4 border-r">{user.answer}</td>
                      <td className="py-2 px-4">
                        <button
                          className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none"
                          onClick={() => {openModal(user);sqid(user._id)}}
                        >
                          Update
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none"
                          onClick={() => navigate('/admindashboard')}
                        >
                          Approval
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none"
                          onClick={() => decline(user._id)}
                        >
                          Decline
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {modalOpen && (
            <Modal
              question={currentQuestion}
              onClose={() => setModalOpen(false)}
              onUpdate={(updatedQuestion) => update(currentQuestion._id, updatedQuestion)}
            />
          )}
        </>
      )}
    </>
  );


function Modal({ question, onClose, onUpdate }) {
  const [updatedQuestion, setUpdatedQuestion] = useState({ question: '', answer: '' });

  useEffect(() => {
    if (question) {
      setUpdatedQuestion({ question: question.question, answer: question.answer });
    }
  }, [question]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUpdatedQuestion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleUpdate(id) {
    
    const q=updatedQuestion.question
    const a=updatedQuestion.answer
    console.log(q,a,qid)
    const updateres=await axios.post('http://localhost:3000/api/user/updateqa',{question:q,answer:a,id:qid})
    const {message}=updateres.data
    if(message=='s'){
      const res = await axios.get('http://localhost:3000/api/user/qaa');
      const { message, qaa } = res.data;
      if (message === 'f') {
        sf(0);
      } else {
        setQuestion(qaa);
        sf(1);
      }

    }
    
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Update Question</h2>
        <label htmlFor="question" className="block mb-2">
          Question:
          <input
            type="text"
            id="question"
            name="question"
            value={updatedQuestion.question}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-1 w-full"
          />
        </label>
        <label htmlFor="answer" className="block mb-4">
          Answer:
          <input
            type="text"
            id="answer"
            name="answer"
            value={updatedQuestion.answer}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-1 w-full"
          />
        </label>
        <div className="flex justify-end">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mr-2"
            onClick={handleUpdate}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}}
