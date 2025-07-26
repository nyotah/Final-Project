import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Login.tsx'

// setting up react router with 2 pages: login and main app
const router = createBrowserRouter([
  {
    path: "/", // default route goes to login page
    element: <Login/>,
  },
  {
    path: "/main", // once user logs in, send to main app
    element: <App/>
  }
])

// rendering the app into the root div in index.html
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* gives the whole app access to the routes */}
    <RouterProvider router={router}/>
  </StrictMode>,
)
