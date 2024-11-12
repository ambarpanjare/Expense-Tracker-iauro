// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage.jsx';
import Signup from './pages/RegisterPage.jsx';
// import Dashboard from './pages/ExpensePage.jsx';
import Home from './pages/HomePage.jsx';
// import EditExpense from './pages/EditExpense';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
         <Route path="/home" element={<Home />} /> 
        {/* <Route path="/edit-expense/:id" element={<EditExpense />} />  */}
      </Routes>
    </Router>
  );
};

export default App;
