import React from 'react';
import { Link } from "react-router-dom";
import "./home.css";
import robot from '../images/robot.png';
import { FaArrowRight } from "react-icons/fa";


const Home = () => {
   return (
      <div className="body">
         <div className="image">
            <img id="robot" src={robot} alt="robot" />
            <div id="rectangle"> </div>
         </div>
         <div className="information">
            <p id="title"> ReddScript </p>
            <p id="text"> Welcome to ReddScript - an application that retrieves information from​ Reddit​ and presents a list of posts about the JavaScript category. Let´s check it out! </p>
            <Link to="/posts"> <button className='button-24'> Posts <FaArrowRight style={{fontSize:"0.6em", marginLeft: "12px"}}/> </button> </Link>
         </div>
      </div>
   );
}

export default Home;