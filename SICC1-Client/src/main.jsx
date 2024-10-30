import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ErrorPage from './components/ErrorPage.jsx'
import HomePage from './components/HomePage.jsx'
import GamesPage from './components/GamesPage.jsx'
import Pangramea from './components/Pangramea.jsx'
import UserProfilePage from './components/UserProfilePage.jsx'

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
        path:"/games",
        element: <GamesPage/>
      },
      {
        path:"/pangramea",
        element: <Pangramea/>
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
