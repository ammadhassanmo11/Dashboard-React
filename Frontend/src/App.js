
// App.js or your route configuration file
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignIn from './components/SignIn';
import Dashboard from './components/dashboard';
import AddData from './components/add_data';
import DeleteUser from './components/deleteuser';
import NameAuth from './components/nameauth';
import UpdateData from './components/updatedata';
import RegistrationForm from './components/registrationform'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add_data" element={<AddData />} />
        <Route path="/deleteuser" element={<DeleteUser />} />
        <Route path="/nameauth" element={<NameAuth />} />
        <Route path="/updatedata/:firstName" element={<UpdateData />} />
        <Route path="/registrationform" element={<RegistrationForm />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;



