import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Home from './Home';
import ArticleForm from './ArticleForm';
import Login from './Login'; // Import the Login component
import './App.css';

function App() {
  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null; // Check if a token exists in local storage
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header me-auto d-flex">
          <img src="news.gif" className="icon" alt="" />
          <h1 className="ms-2 bold">Trendy Newz</h1>
          <ul className="ms-auto d-flex">
            <li className="menu-item mx-2"><Link to="/Home">Home</Link></li>
            <li className="menu-item mx-2"><Link to="/">Login</Link></li>
          </ul>
        </header>
        <Routes>
          <Route path="/Home" element={isAuthenticated() ? <Home /> : <Navigate to="/" />} />
          <Route path="/article-form" element={isAuthenticated() ? <ArticleForm /> : <Navigate to="/" />} />
          <Route path="/" element={<Login />} /> {/* Default route to Login */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;