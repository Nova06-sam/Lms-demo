import React, { useState } from "react";
import './Header.css';
import { Link } from "react-router-dom";
export default function Header(){
     const links = [
        {id:1,call:'Features',link:"#"},
        {id:2,call:'pricing',link:"#"},
        {id:3,call:'about',link:"#"},
        {id:4,call:'contact',link:"#"},
     ];
     const[show,setShow] = useState(false)
    return(
        <>
          <header>
              <nav className="nav-main flex p-5">
                   <div className="n-box n-box3 flex gap-x-3">
                        <Link to={'/login'} className="btns">login</Link>
                        <Link to={'/signup'} className="btns">sign up</Link>
                        <Link to={"/student"} className="btns">student</Link>
                        <Link to={"/teacher"} className="btns">Teacher</Link>
                        <Link to={"/admin"} className="btns">Admin</Link>
                        
                   </div>
              </nav>
          </header>
        </>
    )
}