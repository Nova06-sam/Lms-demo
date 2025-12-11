import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import './backDashboard.css';
export default function BackToDashboard() {
     const navigate = useNavigate();
     return(
        <>
        {/* back */}
        <div className="d-toback flex gap-3 justify-center items-center bg-white shadow-md font-bold rounded-4xl hover:bg-green-400 cursor-pointer hover:text-white"
            onClick={() => navigate(-1)}
        >
            <FaArrowLeftLong className="c-icon text-2xl" /> <span>back to dashboard</span>
        </div>
    </>
    )}