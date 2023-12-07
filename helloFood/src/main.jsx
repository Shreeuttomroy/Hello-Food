import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './Login/Login.jsx'
import Home from './Home/Home.jsx'
import SignUp from './signup/SignUp.jsx'
import AuthProvider from './AuthProvider/AuthProvider.jsx'
import ErrorPage from './ErrorPage/ErrorPage.jsx'
import AvailableFoods from './RoutesComponent/AvailableFood/AvailableFoods.jsx'
import Food from './RoutesComponent/AvailableFood/Food.jsx'
import AddFood from './RoutesComponent/AddFood/AddFood.jsx'
import MyFoodRequest from './RoutesComponent/MyFoodRequest/MyFoodRequest.jsx'
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx'
import ManageFood from './RoutesComponent/ManageFood/ManageFood.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "",
        element: <Home></Home>
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "signup",
        element: <SignUp></SignUp>
      },
      {
        path:"addfood",
        element: <PrivateRoute><AddFood></AddFood></PrivateRoute>
      },
      {
        path:"availablefoods",
        element: <PrivateRoute><AvailableFoods></AvailableFoods></PrivateRoute>
      },
      {
        path:"food/:id",
        element:<PrivateRoute><Food></Food></PrivateRoute>
      },
      {
        path:"managemyfoods",
        element: <PrivateRoute><ManageFood></ManageFood></PrivateRoute>
      },
      {
        path:"myfoodrequest",
        element: <PrivateRoute><MyFoodRequest></MyFoodRequest></PrivateRoute>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)
