import React from "react";
import './back.css';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
export default function Back() {
     const navigate = useNavigate();
     return(
        <>
        {/* back */}
        <div className="d-back flex justify-center items-center  hover:bg-green-400 cursor-pointer"
            onClick={() => navigate('/')}
        >
            <FaArrowLeftLong className="c-icon" />
        </div>
    </>
    )}