import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';  // Import AuthContext
import Homepage from './routes/homepage/Homepage.jsx';
import DashboardPage from './routes/dashboardPage/DashboardPage.jsx';
import ChatPage from './routes/chatPage/ChatPage.jsx';
import RootLayout from './layouts/rootLayout/RootLayout.jsx';
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout.jsx';
import SignInPage from './routes/SignIn/SignInPage.jsx';  // Default import
import SignUpPage from './routes/SignUp/SignUpPage.jsx';  // Default import

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/sign-in/*', element: <SignInPage /> },  // SignInPage used as default export
      { path: '/sign-up/*', element: <SignUpPage /> },  // SignUpPage used as default export
      {
        element: <DashboardLayout />,
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/dashboard/chats/:id', element: <ChatPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);