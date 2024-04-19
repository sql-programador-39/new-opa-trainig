import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Categorys from './pages/Categorys/Categorys'
import './index.css'
import Topic from './pages/Topic/Topic'
import Layout from './Layouts/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Categorys />,
      },
      {
        path: '/category/:category/:course',
        element: <Topic />,
      },
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
