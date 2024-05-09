import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function AllUsers() {
    const [allUser, setAllUser] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [editUserName, setEditUserName] = useState('');
    const [editUserEmail, setEditUserEmail] = useState('');
    const [btname,sbtname]=useState('Deactivate')
    const [f,sf]=useState(0)
    const navigate=useNavigate()

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get('http://localhost:3000/api/admin/getuser');
                const { message, ud } = response.data;
                if (message === 'f') {
                    toast.error('No users available');
                    sf(0)
                } else {
                    setAllUser(ud);
                    sf(1)
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchUser();
    }, []);

    async function removeUser(id) {
        try {
            const res2 = await axios.delete(`http://localhost:3000/api/admin/removeuser/${id}`);
            const { message } = res2.data;
            if (message === 's') {
                const response3 = await axios.get('http://localhost:3000/api/admin/getuser');
                const { message, ud } = response3.data;
                if (message === 'f') {
                    toast.error('No users available');
                } else {
                    setAllUser(ud);
                }
            }
        } catch (error) {
            console.error('Error removing user:', error);
        }
    }

    async function editUser(id) {
        setEditUserId(id);
        // Fetch user details to pre-populate the edit fields if needed
        const userToEdit = allUser.find(user => user._id === id);
        if (userToEdit) {
            setEditUserName(userToEdit.username);
            setEditUserEmail(userToEdit.email);
        }
    }

    async function saveEdit() {
        try {
          
            // Perform edit request with updated data
            const res = await axios.post('http://localhost:3000/api/admin/edituser', {
                uid: editUserId,
                username: editUserName,
                email: editUserEmail
            });
            const {message}=res.data
            if(message=='s'){
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
            // Handle success or error
        } catch (error) {
            console.error('Error editing user:', error);
        }
        // Close edit dialog here if needed
        setEditUserId(null);
    }
    async function active(e,s){
        if(s=='inactive'){
           
            console.log('dfdf')
            const res=await axios.post('http://localhost:3000/api/admin/active',{id:e,s:'active'})
            
            const response = await axios.get('http://localhost:3000/api/admin/getuser');
                const { message, ud } = response.data;
                if (message === 'f') {
                    toast.error('No users available');
                } else {
                    setAllUser(ud);
                }
          


        }
        else{
            console.log('sdsdsdsd')
            
            const res=await axios.post('http://localhost:3000/api/admin/active',{id:e,s:'inactive'})
            const response = await axios.get('http://localhost:3000/api/admin/getuser');
                const { message, ud } = response.data;
                if (message === 'f') {
                    toast.error('No users available');
                } else {
                    setAllUser(ud);
                }

         
            

        }
      

    }

    return (
        <>
            <ToastContainer />
           {f==0?(<><button className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none" onClick={() => navigate('/')}>
                                            Create User
                                        </button></>):(<></>)} 
            <div className="bg-gradient-to-b from-purple-100 to-white min-h-screen">
                <div className="container mx-auto p-8">
                    <h1 className="text-3xl font-semibold mb-4">All Users</h1>
                    <table className="w-full border border-collapse border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 border-r">ID</th>
                                <th className="py-2 px-4 border-r">Name</th>
                                <th className="py-2 px-4 border-r">Email</th>
                                <th className="py-2 px-4 border-r">Role</th>
                                <th className="py-2 px-4 border-r">Active</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUser.map((user, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="py-2 px-4 border-r">{index + 1}</td>
                                    <td className="py-2 px-4 border-r">{user.username}</td>
                                    <td className="py-2 px-4 border-r">{user.email}</td>
                                    <td className="py-2 px-4 border-r">User</td>
                                    <td className="py-2 px-4 border-r">{user.status}</td>
                                    <td className="py-2 px-4">
                                    <button className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none" onClick={() => active(user._id,user.status)}>
                                           Inactive/Active
                                        </button>
                                        <button className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none" onClick={() => removeUser(user._id)}>
                                            Remove User
                                        </button>
                                        <button className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none" onClick={() => editUser(user._id)}>
                                            Edit User
                                        </button>
                                        <button className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none" onClick={() => navigate('/')}>
                                            Create User
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Edit Dialog */}
            {editUserId && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">Edit User</h2>
                        <input
                            type="text"
                            value={editUserName}
                            onChange={e => setEditUserName(e.target.value)}
                            placeholder="Username"
                            className="w-full mb-2 p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="email"
                            value={editUserEmail}
                            onChange={e => setEditUserEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full mb-2 p-2 border border-gray-300 rounded"
                        />
                        <div className="flex justify-end">
                            <button
                                className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 mr-2"
                                onClick={saveEdit}
                            >
                                Save
                            </button>
                            <button
                                className="bg-gray-500 text-white py-1 px-3 rounded-md hover:bg-gray-600"
                                onClick={() => setEditUserId(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
