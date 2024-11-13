import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ErrorPage from './components/ErrorPage.jsx'
import HomePage from './components/HomePage.jsx'
import UserProfilePage from './components/UserProfilePage.jsx'
import Game from './components/Game.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path:"/home",
        element: <HomePage/>
      },
      {
        path:"/pangramea",
        element: <Game/>
      },
      {
        path:"/myprofile/:id",
        element: <UserProfilePage/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
