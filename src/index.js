import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Form from './form/form';
import SignIn from './sign-in/signIn';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './home/homePage';

const routes = createBrowserRouter([
  {
    path:"/",
    element: <HomePage/>
  },
  {
    path:"/log-in",
    element: <Form />
  },
  {
    path:"/sign-in",
    element: <SignIn />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
reportWebVitals();
