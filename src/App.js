import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/home/home.js';
import Posts from './components/posts/posts.js';
import SelfPost from './components/posts/selfpost';
import Navbar from './components/navbar/navbar.js';

class App extends Component {
  render() {
    return (    
      <div>
       <Router>
          <Navbar/>
            <Routes>
             <Route exact path="/" element={<Home/>} />
             <Route exact path="/Posts" element={<Posts/>}/>
             <Route exact path="/Posts/SelfPost" element={<SelfPost/>}/>
           </Routes>
      </Router>
      </div> 
    );
  }
}
 
export default App;

