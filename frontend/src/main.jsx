import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Doubt_Solver from "./pages/Doubt_Solver.jsx"
import Doubt_Asker from './pages/Doubt_Asker.jsx';
import AskDoubt from './pages/AskDoubt.jsx';
import EditInfo from './pages/EditInfo.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/doubt_solver',
    element: <Doubt_Solver />
  },
  {
    path: '/doubt_asker',
    element: <Doubt_Asker />
  },
  {
    path: '/askdoubt',
    element: <AskDoubt />
  },
  {
    path: '/editInfo',
    element: <EditInfo />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
