import React from 'react';
import { NavLink, } from 'react-router-dom';
import "./navbar.css";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
   return (
      <div className="navbar">
         <NavLink to="/"> <FaHome style={{ color: "black", fontSize: "1.2em"}} /></NavLink>
         <div className="links">
            <NavLink to="/posts">Posts</NavLink>
         </div>
      </div>
   );
}


export default Navbar;
