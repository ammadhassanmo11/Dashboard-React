
// /// Dashboard.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './dashboard.css';

// const Dashboard = () => {
//   // Retrieve the username from localStorage
//   const userName = localStorage.getItem('username') || 'Guest';

//   return (
//     <div className="dashboard">
//       <h2>Welcome, {userName}!</h2>
//       <div className="dashboard-buttons">
//         <Link to="/add_data" className="dashboard-button-link">
//           <button>Add Data</button>
//         </Link>
//         <Link to="/deleteuser" className="dashboard-button-link">
//           <button>Delete User</button>
//         </Link>
//         <Link to="/nameauth" className="dashboard-button-link">
//           <button>Update Data</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




/// Dashboard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  // Retrieve the username from localStorage
  const userName = localStorage.getItem('username') || 'Guest';

  const handleSignOut = () => {
    // Clear username from localStorage to indicate signout
    localStorage.removeItem('username');

    // Redirect to the sign-in page
    navigate('/signin');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome, {userName}!</h2>
        <button className="signout-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
      <div className="dashboard-buttons">
        <Link to="/add_data" className="dashboard-button-link">
          <button>Add Data</button>
        </Link>
        <Link to="/deleteuser" className="dashboard-button-link">
          <button>Delete User</button>
        </Link>
        <Link to="/nameauth" className="dashboard-button-link">
          <button>Update Data</button>
        </Link>
        <Link to="/registrationform" className="dashboard-button-link">
          <button>Register User</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

