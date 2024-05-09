import React from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet } from 'react-router-dom';
export default function admindashboard() {

  const LinkCard = ({ to, title }) => {
    return (
      <Link to={to}>
        <div className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-100 transition duration-300">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          {/* You can customize the icon here if needed */}
          <FaRegCircleUser className="text-4xl text-gray-500 mx-auto mb-4" />

        </div>
      </Link>
    );
  };
  const LinkCardb = ({ to, title }) => {
    return (
      <Link to={to}>
        <div className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-100 transition duration-300">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          {/* You can customize the icon here if needed */}
       

        </div>
      </Link>
    );
  };
    
  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <LinkCard to="allusers" title="All Users" />
        <LinkCardb to="approveQ" title="ApprovalQ&A" />
        <LinkCard to="/chatuser" title="Chat Users"/>
       
        {/* Add more LinkCards for additional links */}
      </div>
    </div>
    </>
  )
}
