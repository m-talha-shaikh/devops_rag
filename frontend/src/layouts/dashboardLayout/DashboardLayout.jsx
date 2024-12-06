// import { useState, useEffect } from 'react';
// import './dashboardLayout.css';
// import { Outlet, useNavigate } from "react-router-dom";
// import ChatList from '../../components/chatList/ChatList';
// import axios from 'axios';

// const DashboardLayout = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Check authentication status
//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = localStorage.getItem('token');  // Get the JWT from localStorage
      
//       if (!token) {
//         console.log('No token found, redirecting to sign-in');
//         setIsAuthenticated(false); // Set to false and finish loading
//         return;
//       }

//       try {
//         // Call your backend to verify the JWT token
//         const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/check`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });


//         console.log('Authentication check response:', response.data); // Log the response data

//         // If the response is successful, the user is authenticated
//         if (response.data.isAuthenticated) {
//           console.log("Yes");
//           setIsAuthenticated(true);
//         } else {
//           console.log("false");
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         console.error("Authentication check failed:", error);
//         setIsAuthenticated(false);  // If there's an error, user is not authenticated
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();
//   }, [navigate]);

//   // If loading, show a loading indicator
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // If not authenticated, redirect to sign-in page
//   if (!isAuthenticated) {
//     console.log("User is not authenticated, redirecting...");
//     // navigate("/sign-in"); // Only trigger once
//     // return null; // Prevent rendering the dashboard layout
//   }

//   console.log('User authenticated:', isAuthenticated); // Log final state of authentication

//   return (
//     <div className='dashboardLayout'>
//       <div className='menu'>
//         <ChatList />
//       </div>
//       <div className='content'>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import { useState, useEffect } from 'react';
import './dashboardLayout.css';
import { Outlet, useNavigate } from "react-router-dom";
import ChatList from '../../components/chatList/ChatList';

const DashboardLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');  // Get the JWT from localStorage
      
      if (!token) {
        console.log('No token found, redirecting to sign-in');
        setIsAuthenticated(false); // Set to false and finish loading
        return;
      }

      try {
        // Use fetch to call your backend and verify the JWT token
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/check`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json(); // Parse the JSON response

        console.log('Authentication check response:', data); // Log the response data

        // If the response is successful, the user is authenticated
        if (data.isAuthenticated) {
          console.log("Yes");
          setIsAuthenticated(true);
        } else {
          console.log("false");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);  // If there's an error, user is not authenticated
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // If loading, show a loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to sign-in page
  if (!isAuthenticated) {
    console.log("User is not authenticated, redirecting...");
    // navigate("/sign-in"); // Only trigger once
    // return null; // Prevent rendering the dashboard layout
  }

  console.log('User authenticated:', isAuthenticated); // Log final state of authentication

  return (
    <div className='dashboardLayout'>
      <div className='menu'>
        <ChatList />
      </div>
      <div className='content'>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
